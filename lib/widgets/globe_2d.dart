import 'dart:math' as math;
import 'package:flutter/material.dart';
import 'package:lucide_icons/lucide_icons.dart';
import '../models/culture_capsule.dart';

class Globe2D extends StatefulWidget {
  final List<CultureCapsule> capsules;
  final Function(CultureCapsule) onCapsuleSelect;
  final String? activeCapsuleId;

  const Globe2D({
    Key? key,
    required this.capsules,
    required this.onCapsuleSelect,
    this.activeCapsuleId,
  }) : super(key: key);

  @override
  State<Globe2D> createState() => _Globe2DState();
}

class _Globe2DState extends State<Globe2D> with SingleTickerProviderStateMixin {
  double _rotation = 0.0;
  bool _isDragging = false;
  late AnimationController _autoRotateController;

  @override
  void initState() {
    super.initState();
    _autoRotateController = AnimationController(
      vsync: this,
      duration: const Duration(seconds: 20), // Constant slow rotation
    )..addListener(() {
        if (!_isDragging) {
          setState(() {
            _rotation = (_rotation + 0.5) % 360; // Approximate speed
          });
        }
      });
    _autoRotateController.repeat();
  }

  @override
  void dispose() {
    _autoRotateController.dispose();
    super.dispose();
  }

  void _handlePanStart(DragStartDetails details) {
    setState(() {
      _isDragging = true;
    });
  }

  void _handlePanUpdate(DragUpdateDetails details) {
    setState(() {
      _rotation = (_rotation + details.delta.dx * 0.5) % 360;
    });
  }

  void _handlePanEnd(DragEndDetails details) {
    setState(() {
      _isDragging = false;
    });
  }

  /// Calculates marker projection given lat/lng and current globe rotation.
  Map<String, dynamic> _getMarkerPosition(double lat, double lng) {
    double adjustedLng = ((lng + _rotation) % 360 + 360) % 360;
    bool visible = adjustedLng > 90 && adjustedLng < 270;

    // Convert to 2D projection percentages (0 to 1) relative to parent box
    double x = 0.5 + (adjustedLng - 180) * 0.0028; // similar to * 0.28 / 100
    double y = 0.5 - lat * 0.0055; // similar to * 0.55 / 100

    double scale = visible
        ? 0.5 + 0.5 * math.cos((adjustedLng - 180) * math.pi / 180)
        : 0.3;

    return {
      'x': x,
      'y': y,
      'visible': visible,
      'scale': scale,
    };
  }

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onPanStart: _handlePanStart,
      onPanUpdate: _handlePanUpdate,
      onPanEnd: _handlePanEnd,
      onPanCancel: () => setState(() => _isDragging = false),
      child: Center(
        child: AspectRatio(
          aspectRatio: 1,
          child: Container(
            constraints: const BoxConstraints(maxWidth: 800, maxHeight: 800),
            child: Stack(
              children: [
                // Globe Sphere Base
                Positioned.fill(
                  child: Container(
                    decoration: BoxDecoration(
                      shape: BoxShape.circle,
                      gradient: const LinearGradient(
                        begin: Alignment.topLeft,
                        end: Alignment.bottomRight,
                        colors: [Color(0xFF1E293B), Color(0xFF020617)], // slate-800 to slate-950
                      ),
                      border: Border.all(
                        color: Colors.amber[600]!.withOpacity(0.3),
                        width: 4,
                      ),
                      boxShadow: [
                        BoxShadow(
                          color: Colors.black.withOpacity(0.5),
                          blurRadius: 40,
                          spreadRadius: 10,
                        )
                      ],
                    ),
                    clipBehavior: Clip.antiAlias,
                    child: Stack(
                      children: [
                        // Atmosphere Glow (Abstract Pulse)
                        // Implementing a static glow for simplicity, could animate opacity
                        Positioned.fill(
                          child: Container(
                            decoration: BoxDecoration(
                              gradient: LinearGradient(
                                begin: Alignment.topLeft,
                                end: Alignment.bottomRight,
                                colors: [
                                  Colors.amber.withOpacity(0.2),
                                  Colors.transparent,
                                  Colors.blue.withOpacity(0.2),
                                ],
                              ),
                            ),
                          ),
                        ),

                        // Grid Lines and Continents Painter
                        Positioned.fill(
                          child: CustomPaint(
                            painter: _GlobeGridPainter(rotation: _rotation),
                          ),
                        ),
                      ],
                    ),
                  ),
                ),

                // Markers Layer
                LayoutBuilder(
                  builder: (context, constraints) {
                    final width = constraints.maxWidth;
                    final height = constraints.maxHeight;

                    return Stack(
                      children: widget.capsules.map((capsule) {
                        final pos = _getMarkerPosition(capsule.lat, capsule.lng);
                        final isActive = widget.activeCapsuleId == capsule.id;
                        final isVisible = pos['visible'] as bool;
                        final xPct = pos['x'] as double;
                        final yPct = pos['y'] as double;
                        final scale = pos['scale'] as double;

                        // Calculate actual pixel positions
                        final dx = xPct * width - 24; // offset by half marker size (assuming ~48 total width)
                        final dy = yPct * height - 24;

                        if (!isVisible && !isActive) {
                           // Dimly visible or hidden when on back
                           return Positioned(
                             left: dx,
                             top: dy,
                             child: Opacity(
                               opacity: 0.1,
                               child: Transform.scale(
                                 scale: scale,
                                 child: const Icon(LucideIcons.mapPin, color: Colors.amber, size: 24),
                               ),
                             ),
                           );
                        }

                        return Positioned(
                          left: dx,
                          top: dy,
                          child: Transform.scale(
                            scale: scale,
                            child: GestureDetector(
                              onTap: () => widget.onCapsuleSelect(capsule),
                              child: AnimatedContainer(
                                duration: const Duration(milliseconds: 300),
                                width: 48,
                                height: 48,
                                child: Stack(
                                  clipBehavior: Clip.none,
                                  alignment: Alignment.center,
                                  children: [
                                    // Marker Glow using a decorated container
                                    Container(
                                      width: isActive ? 40 : 24,
                                      height: isActive ? 40 : 24,
                                      decoration: BoxDecoration(
                                        shape: BoxShape.circle,
                                        color: isActive ? Colors.amber[400] : Colors.amber[500]!.withOpacity(0.5),
                                        boxShadow: [
                                          BoxShadow(
                                            color: Colors.amber.withOpacity(0.6),
                                            blurRadius: 15,
                                            spreadRadius: isActive ? 10 : 5,
                                          )
                                        ],
                                      ),
                                    ),
                                    Icon(
                                      LucideIcons.mapPin,
                                      color: isActive ? Colors.amber[100] : Colors.amber[400],
                                      size: isActive ? 36 : 28,
                                    ),
                                    // Label (only shown if visible)
                                    if (isVisible)
                                      Positioned(
                                        top: 40,
                                        child: Container(
                                          padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                                          decoration: BoxDecoration(
                                            color: const Color(0xFF0F172A).withOpacity(0.9), // slate-900
                                            borderRadius: BorderRadius.circular(12),
                                            border: Border.all(color: Colors.amber[600]!.withOpacity(0.5)),
                                          ),
                                          child: Text(
                                            capsule.name,
                                            style: const TextStyle(
                                              fontSize: 10,
                                              fontWeight: FontWeight.bold,
                                              color: Color(0xFFFEF3C7), // amber-100
                                            ),
                                          ),
                                        ),
                                      ),
                                  ],
                                ),
                              ),
                            ),
                          ),
                        );
                      }).toList(),
                    );
                  },
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

class _GlobeGridPainter extends CustomPainter {
  final double rotation;

  _GlobeGridPainter({required this.rotation});

  @override
  void paint(Canvas canvas, Size size) {
    final cx = size.width / 2;
    final cy = size.height / 2;
    final rx = size.width * 0.45;

    final gridPaint = Paint()
      ..color = Colors.amber[400]!.withOpacity(0.2)
      ..style = PaintingStyle.stroke
      ..strokeWidth = 0.5;

    // Drawing Latitude lines
    final latitudes = [-60, -30, 0, 30, 60];
    for (var lat in latitudes) {
      double pctY = 0.5 - lat * 0.0055;
      double y = size.height * pctY;
      double currentRy = math.cos(lat * math.pi / 180) * (size.height * 0.45);
      
      canvas.drawOval(
        Rect.fromCenter(center: Offset(cx, y), width: rx * 2, height: currentRy * 2),
        gridPaint,
      );
    }

    // Drawing Longitude lines
    final longitudes = [0, 30, 60, 90, 120, 150];
    for (var lng in longitudes) {
      double offset = (lng + rotation) % 180;
      bool visible = offset < 90;
      double currentRx = math.cos(offset * math.pi / 180) * rx;

      final paint = Paint()
        ..color = Colors.amber[400]!.withOpacity(visible ? 0.3 : 0.1)
        ..style = PaintingStyle.stroke
        ..strokeWidth = 0.5;

      canvas.drawOval(
        Rect.fromCenter(center: Offset(cx, cy), width: currentRx * 2, height: size.height * 0.45 * 2),
        paint,
      );
    }

    // Drawing Abstract Continents (simulated shapes drifting with rotation)
    // To make it loop, we can draw them twice (offset by 360 map width analog)
    final continentPaint = Paint()
      ..color = Colors.amber[700]!.withOpacity(0.4)
      ..maskFilter = const MaskFilter.blur(BlurStyle.normal, 10);
      
    double xOffset = -(rotation * 0.5 * size.width / 100);
    // Loop the background offset
    xOffset = xOffset % size.width;
    if (xOffset > 0) xOffset -= size.width;

    canvas.save();
    canvas.translate(xOffset, 0);

    // Draw main copy
    _drawContinents(canvas, size, continentPaint, 0);
    // Draw duplicate copy for wrapping
    _drawContinents(canvas, size, continentPaint, size.width);
    
    canvas.restore();
  }

  void _drawContinents(Canvas canvas, Size size, Paint paint, double offsetX) {
    // top-[30%] left-[20%] w-20 h-16 rounded-full
    canvas.drawOval(Rect.fromLTWH(size.width * 0.2 + offsetX, size.height * 0.3, size.width * 0.15, size.height * 0.1), paint);
    
    // top-[25%] left-[35%] w-32 h-24 rounded-[40%]
    canvas.drawRRect(RRect.fromRectAndRadius(Rect.fromLTWH(size.width * 0.35 + offsetX, size.height * 0.25, size.width * 0.25, size.height * 0.15), const Radius.circular(30)), paint);

    // top-[45%] left-[15%] w-28 h-20 rounded-[35%]
    canvas.drawRRect(RRect.fromRectAndRadius(Rect.fromLTWH(size.width * 0.15 + offsetX, size.height * 0.45, size.width * 0.2, size.height * 0.15), const Radius.circular(25)), paint);

    // top-[40%] left-[60%] w-40 h-32 rounded-[30%]
    canvas.drawRRect(RRect.fromRectAndRadius(Rect.fromLTWH(size.width * 0.6 + offsetX, size.height * 0.4, size.width * 0.3, size.height * 0.25), const Radius.circular(40)), paint);

    // top-[60%] left-[55%] w-24 h-20 rounded-full
    canvas.drawOval(Rect.fromLTWH(size.width * 0.55 + offsetX, size.height * 0.6, size.width * 0.15, size.height * 0.12), paint);
  }

  @override
  bool shouldRepaint(covariant _GlobeGridPainter oldDelegate) {
    return oldDelegate.rotation != rotation;
  }
}
