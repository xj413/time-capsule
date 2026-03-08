import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:lucide_icons/lucide_icons.dart';
import 'package:audioplayers/audioplayers.dart';

import 'models/culture_capsule.dart';
import 'data/culture_capsules.dart';
import 'widgets/globe_2d.dart';
import 'widgets/culture_capsule_modal.dart';
import 'widgets/starfield_background.dart';

void main() {
  runApp(const InteractiveGlobeApp());
}

class InteractiveGlobeApp extends StatelessWidget {
  const InteractiveGlobeApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Global Time Capsule',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        brightness: Brightness.dark,
        scaffoldBackgroundColor: const Color(0xFF0F172A), // slate-900
        textTheme: GoogleFonts.interTextTheme(Theme.of(context).textTheme).apply(
          bodyColor: Colors.amber[50],
          displayColor: Colors.amber[100],
        ),
      ),
      home: const HomeScreen(),
    );
  }
}

class HomeScreen extends StatefulWidget {
  const HomeScreen({Key? key}) : super(key: key);

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> with SingleTickerProviderStateMixin {
  CultureCapsule? _selectedCapsule;
  late AnimationController _pulseController;
  final AudioPlayer _audioPlayer = AudioPlayer();
  bool _isPlaying = true;

  @override
  void initState() {
    super.initState();
    _pulseController = AnimationController(
      vsync: this,
      duration: const Duration(seconds: 2),
    )..repeat(reverse: true);
    
    _initAudio();
    _loadData();
  }

  Future<void> _loadData() async {
    await fetchAndMergeCapsules();
    if (mounted) {
      setState(() {});
    }
  }

  Future<void> _initAudio() async {
    await _audioPlayer.setReleaseMode(ReleaseMode.loop);
    await _audioPlayer.play(AssetSource('audio/ambient.mp3'));
  }

  @override
  void dispose() {
    _pulseController.dispose();
    _audioPlayer.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final screenWidth = MediaQuery.of(context).size.width;
    final isDesktop = screenWidth > 768;

    return Scaffold(
      body: Stack(
        fit: StackFit.expand,
        children: [
          // Animated Background Gradient (simplified pulse for stars effect)
          Container(
            decoration: const BoxDecoration(
              gradient: LinearGradient(
                begin: Alignment.topCenter,
                end: Alignment.bottomCenter,
                colors: [
                  Color(0xFF020617), // slate-950
                  Color(0xFF0F172A), // slate-900
                  Color(0xFF020617), // slate-950
                ],
              ),
            ),
          ),
          
          // Starfield Background
          const Positioned.fill(
            child: StarfieldBackground(),
          ),
          
          // Radial glow effect
          AnimatedBuilder(
            animation: _pulseController,
            builder: (context, child) {
              return Opacity(
                opacity: 0.2 + (_pulseController.value * 0.1),
                child: Container(
                  decoration: const BoxDecoration(
                    gradient: RadialGradient(
                      colors: [Color(0x3378350F), Colors.transparent], // amber-900 with low opacity
                      radius: 1.5,
                    ),
                  ),
                ),
              );
            },
          ),

          // Header Content
          Positioned(
            top: 0,
            left: 0,
            right: 0,
            child: SafeArea(
              child: Padding(
                padding: EdgeInsets.symmetric(horizontal: isDesktop ? 32 : 24, vertical: 24),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      children: [
                        SizedBox(
                          width: 48,
                          height: 48,
                          child: Stack(
                            alignment: Alignment.center,
                            children: [
                              AnimatedBuilder(
                                animation: _pulseController,
                                builder: (context, child) {
                                  return Container(
                                    width: 40 + (_pulseController.value * 8),
                                    height: 40 + (_pulseController.value * 8),
                                    decoration: BoxDecoration(
                                      shape: BoxShape.circle,
                                      color: Colors.amber[500]!.withValues(alpha: 0.3),
                                    ),
                                    child: BackdropFilter(
                                      filter: ImageFilter.blur(sigmaX: 8, sigmaY: 8),
                                      child: Container(color: Colors.transparent),
                                    ),
                                  );
                                },
                              ),
                              Transform.rotate(
                                angle: _pulseController.value * 3.14 * 2,
                                child: Icon(LucideIcons.compass, size: 40, color: Colors.amber[500]),
                              ),
                            ],
                          ),
                        ),
                        const SizedBox(width: 16),
                        Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              "Global Time Capsule",
                              style: GoogleFonts.lora(
                                fontSize: isDesktop ? 48 : 32,
                                color: Colors.amber[100],
                                letterSpacing: 1.2,
                              ),
                            ),
                            Text(
                              "Journey through time and culture across the globe",
                              style: TextStyle(
                                fontSize: isDesktop ? 16 : 14,
                                color: Colors.amber[200]!.withValues(alpha: 0.7),
                              ),
                            ),
                          ],
                        ),
                      ],
                    ),
                    
                    const SizedBox(height: 32),
                    
                    // Info Cards
                    Wrap(
                      spacing: 16,
                      runSpacing: 16,
                      children: [
                        _buildInfoCard(
                          icon: LucideIcons.globe,
                          title: "${cultureCapsules.length}",
                          subtitle: "Culture Capsules",
                        ),
                        _buildInfoCard(
                          icon: LucideIcons.clock,
                          title: "4,500+",
                          subtitle: "Years of History",
                        ),
                        _buildInfoCard(
                          icon: LucideIcons.sparkles,
                          title: "AI-Powered",
                          subtitle: "Historical Summaries",
                        ),
                      ],
                    ),
                  ],
                ),
              ),
            ),
          ),

          // Globe Container
          Positioned(
            top: isDesktop ? 200 : 250,
            bottom: 0,
            left: 0,
            right: 0,
            child: Globe2D(
              capsules: cultureCapsules,
              activeCapsuleId: _selectedCapsule?.id,
              onCapsuleSelect: (capsule) {
                setState(() {
                  _selectedCapsule = capsule;
                });
              },
            ),
          ),

          // Instructions Floating Card
          Positioned(
            bottom: 32,
            left: 0,
            right: 0,
            child: Center(
              child: Container(
                padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
                decoration: BoxDecoration(
                  gradient: LinearGradient(
                    begin: Alignment.topLeft,
                    end: Alignment.bottomRight,
                    colors: [
                      const Color(0xFF1E293B).withValues(alpha: 0.8),
                      const Color(0xFF0F172A).withValues(alpha: 0.8),
                    ],
                  ),
                  borderRadius: BorderRadius.circular(24),
                  border: Border.all(color: Colors.amber[600]!.withValues(alpha: 0.3)),
                  boxShadow: [
                    BoxShadow(color: Colors.black.withValues(alpha: 0.5), blurRadius: 20)
                  ],
                ),
                child: Row(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    const Text("🌍 ", style: TextStyle(fontSize: 16)),
                    Text("Click flowing markers ", style: TextStyle(color: Colors.amber[100], fontWeight: FontWeight.w500)),
                    Text("to open culture capsules  •  🖱️ ", style: TextStyle(color: Colors.amber[100])),
                    Text("Drag to rotate", style: TextStyle(color: Colors.amber[100], fontWeight: FontWeight.w500)),
                  ],
                ),
              ),
            ),
          ),

          // Decorative Corners
          _buildCorner(top: 0, left: 0, isTopLeft: true),
          _buildCorner(top: 0, right: 0, isTopRight: true),
          _buildCorner(bottom: 0, left: 0, isBottomLeft: true),
          _buildCorner(bottom: 0, right: 0, isBottomRight: true),

          // Audio Toggle Button
          Positioned(
            top: 32,
            right: isDesktop ? 32 : 24,
            child: Material(
              color: Colors.transparent,
              child: IconButton(
                icon: Icon(
                  _isPlaying ? LucideIcons.volume2 : LucideIcons.volumeX,
                  color: Colors.amber[200]!.withValues(alpha: 0.8),
                  size: 28,
                ),
                onPressed: () {
                  setState(() {
                    _isPlaying = !_isPlaying;
                    if (_isPlaying) {
                      _audioPlayer.resume();
                    } else {
                      _audioPlayer.pause();
                    }
                  });
                },
              ),
            ),
          ),

          // Modal Overlay
          if (_selectedCapsule != null)
            Positioned.fill(
              child: CultureCapsuleModal(
                capsule: _selectedCapsule!,
                onClose: () {
                  setState(() {
                    _selectedCapsule = null;
                  });
                },
              ),
            ),
        ],
      ),
    );
  }

  Widget _buildInfoCard({required IconData icon, required String title, required String subtitle}) {
    return Container(
      width: 240,
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
          colors: [
            const Color(0xFF1E293B).withValues(alpha: 0.6), // slate-800
            const Color(0xFF0F172A).withValues(alpha: 0.6), // slate-900
          ],
        ),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: Colors.amber[600]!.withValues(alpha: 0.3)),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(icon, size: 32, color: Colors.amber[400]),
          const SizedBox(width: 12),
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                title,
                style: TextStyle(
                  fontSize: 24,
                  fontWeight: FontWeight.bold,
                  color: Colors.amber[100],
                ),
              ),
              Text(
                subtitle,
                style: TextStyle(
                  fontSize: 14,
                  color: Colors.amber[200]!.withValues(alpha: 0.7),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildCorner({double? top, double? bottom, double? left, double? right, bool isTopLeft = false, bool isTopRight = false, bool isBottomLeft = false, bool isBottomRight = false}) {
    return Positioned(
      top: top,
      bottom: bottom,
      left: left,
      right: right,
      child: IgnorePointer(
        child: Container(
          width: 128,
          height: 128,
          decoration: BoxDecoration(
            border: Border(
              top: (isTopLeft || isTopRight) ? BorderSide(color: Colors.amber[600]!.withValues(alpha: 0.3), width: 2) : BorderSide.none,
              bottom: (isBottomLeft || isBottomRight) ? BorderSide(color: Colors.amber[600]!.withValues(alpha: 0.3), width: 2) : BorderSide.none,
              left: (isTopLeft || isBottomLeft) ? BorderSide(color: Colors.amber[600]!.withValues(alpha: 0.3), width: 2) : BorderSide.none,
              right: (isTopRight || isBottomRight) ? BorderSide(color: Colors.amber[600]!.withValues(alpha: 0.3), width: 2) : BorderSide.none,
            ),
            borderRadius: BorderRadius.only(
              topLeft: isTopLeft ? const Radius.circular(24) : Radius.zero,
              topRight: isTopRight ? const Radius.circular(24) : Radius.zero,
              bottomLeft: isBottomLeft ? const Radius.circular(24) : Radius.zero,
              bottomRight: isBottomRight ? const Radius.circular(24) : Radius.zero,
            ),
          ),
        ),
      ),
    );
  }
}
