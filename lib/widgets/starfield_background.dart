import 'package:flutter/material.dart';
import 'dart:math' as math;

class StarfieldBackground extends StatefulWidget {
  const StarfieldBackground({Key? key}) : super(key: key);

  @override
  State<StarfieldBackground> createState() => _StarfieldBackgroundState();
}

class _StarfieldBackgroundState extends State<StarfieldBackground> with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  final math.Random _random = math.Random();
  final List<_Star> _stars = [];

  @override
  void initState() {
    super.initState();
    // Generate static stars
    for (int i = 0; i < 150; i++) {
      _stars.add(_Star(
        x: _random.nextDouble(),
        y: _random.nextDouble(),
        size: _random.nextDouble() * 2 + 0.5,
        twinkleSpeed: _random.nextDouble() * 0.02 + 0.005,
        twinkleOffset: _random.nextDouble() * math.pi * 2,
      ));
    }
    
    _controller = AnimationController(vsync: this, duration: const Duration(seconds: 10))..repeat();
  }
  
  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _controller,
      builder: (context, child) {
        return CustomPaint(
          painter: _StarfieldPainter(_stars, _controller.value),
        );
      },
    );
  }
}

class _Star {
  final double x, y, size, twinkleSpeed, twinkleOffset;
  _Star({required this.x, required this.y, required this.size, required this.twinkleSpeed, required this.twinkleOffset});
}

class _StarfieldPainter extends CustomPainter {
  final List<_Star> stars;
  final double time;

  _StarfieldPainter(this.stars, this.time);

  @override
  void paint(Canvas canvas, Size size) {
    for (var star in stars) {
      double opacity = 0.2 + 0.8 * (math.sin(time * math.pi * 2 * (100 * star.twinkleSpeed) + star.twinkleOffset) * 0.5 + 0.5);
      
      // Draw glow
      final glowPaint = Paint()
        ..color = Colors.amber[200]!.withValues(alpha: opacity * 0.4)
        ..maskFilter = const MaskFilter.blur(BlurStyle.normal, 4.0);
      canvas.drawCircle(Offset(star.x * size.width, star.y * size.height), star.size * 2.5, glowPaint);

      // Draw core
      final corePaint = Paint()
        ..color = Colors.white.withValues(alpha: opacity * 0.9);
      canvas.drawCircle(Offset(star.x * size.width, star.y * size.height), star.size, corePaint);
    }
  }

  @override
  bool shouldRepaint(covariant _StarfieldPainter oldDelegate) => true;
}
