import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:lucide_icons/lucide_icons.dart';
import 'package:cached_network_image/cached_network_image.dart';
import '../models/culture_capsule.dart';

class CultureCapsuleModal extends StatefulWidget {
  final CultureCapsule capsule;
  final VoidCallback onClose;

  const CultureCapsuleModal({
    Key? key,
    required this.capsule,
    required this.onClose,
  }) : super(key: key);

  @override
  State<CultureCapsuleModal> createState() => _CultureCapsuleModalState();
}

class _CultureCapsuleModalState extends State<CultureCapsuleModal>
    with SingleTickerProviderStateMixin {
  late AnimationController _animationController;
  late Animation<double> _fadeAnimation;
  late Animation<Offset> _slideAnimation;

  @override
  void initState() {
    super.initState();
    _animationController = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 300),
    );

    _fadeAnimation = Tween<double>(begin: 0.0, end: 1.0).animate(
      CurvedAnimation(parent: _animationController, curve: Curves.easeOut),
    );

    _slideAnimation = Tween<Offset>(
      begin: const Offset(0.0, 0.05),
      end: Offset.zero,
    ).animate(
      CurvedAnimation(parent: _animationController, curve: Curves.easeOutCubic),
    );

    _animationController.forward();
  }

  @override
  void dispose() {
    _animationController.dispose();
    super.dispose();
  }

  void _closeModal() {
    _animationController.reverse().then((_) {
      widget.onClose();
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.transparent,
      body: FadeTransition(
        opacity: _fadeAnimation,
        child: Stack(
          children: [
            // Blurred dark overlay
            Positioned.fill(
              child: GestureDetector(
                onTap: _closeModal,
                child: BackdropFilter(
                  filter: ImageFilter.blur(sigmaX: 10, sigmaY: 10),
                  child: Container(color: Colors.black.withValues(alpha: 0.6)),
                ),
              ),
            ),
            // Modal Content
            Center(
              child: SlideTransition(
                position: _slideAnimation,
                child: Container(
                  width: double.infinity,
                  constraints: BoxConstraints(
                    maxWidth: 900,
                    maxHeight: MediaQuery.of(context).size.height * 0.9,
                  ),
                  margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 24),
                  decoration: BoxDecoration(
                    color: const Color(0xFF0F172A),
                    borderRadius: BorderRadius.circular(24),
                    border: Border.all(color: Colors.amber[600]!.withValues(alpha: 0.3)),
                    boxShadow: [
                      BoxShadow(color: Colors.black.withValues(alpha: 0.5), blurRadius: 30)
                    ],
                  ),
                  child: ClipRRect(
                    borderRadius: BorderRadius.circular(24),
                    child: DefaultTabController(
                      length: 3,
                      child: Column(
                        children: [
                          _buildHeader(),
                          _buildTabBar(),
                          Expanded(
                            child: TabBarView(
                              children: [
                                _buildHistoryTab(),
                                _buildLifeTodayTab(),
                                _buildCommunityVoicesTab(),
                              ],
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildHeader() {
    return Container(
      padding: const EdgeInsets.all(24),
      decoration: BoxDecoration(
        color: const Color(0xFF1E293B),
        border: Border(bottom: BorderSide(color: Colors.amber[600]!.withValues(alpha: 0.2))),
      ),
      child: Stack(
        children: [
          Row(
            children: [
              Container(
                width: 64,
                height: 64,
                decoration: BoxDecoration(
                  color: Colors.amber[500]!.withValues(alpha: 0.2),
                  borderRadius: BorderRadius.circular(16),
                  border: Border.all(color: Colors.amber[500]!.withValues(alpha: 0.4)),
                ),
                child: Icon(LucideIcons.compass, size: 32, color: Colors.amber[400]),
              ),
              const SizedBox(width: 20),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      widget.capsule.name,
                      style: GoogleFonts.lora(
                        fontSize: 32,
                        fontWeight: FontWeight.bold,
                        color: Colors.amber[100],
                        height: 1.1,
                      ),
                    ),
                    const SizedBox(height: 4),
                    Row(
                      children: [
                        Icon(LucideIcons.mapPin, size: 16, color: Colors.amber[200]!.withValues(alpha: 0.7)),
                        const SizedBox(width: 8),
                        Text(
                          widget.capsule.country,
                          style: TextStyle(
                            fontSize: 16,
                            color: Colors.amber[200]!.withValues(alpha: 0.7),
                          ),
                        ),
                        const SizedBox(width: 16),
                        Icon(LucideIcons.clock, size: 16, color: Colors.amber[200]!.withValues(alpha: 0.7)),
                        const SizedBox(width: 8),
                        Expanded(
                          child: Text(
                            widget.capsule.timelinePeriod,
                            style: TextStyle(
                              fontSize: 14,
                              color: Colors.amber[200]!.withValues(alpha: 0.7),
                            ),
                            overflow: TextOverflow.ellipsis,
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
            ],
          ),
          Positioned(
            top: 0,
            right: 0,
            child: IconButton(
              icon: Icon(LucideIcons.x, color: Colors.amber[100]),
              onPressed: _closeModal,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildTabBar() {
    return Container(
      color: const Color(0xFF0F172A),
      child: TabBar(
        indicatorColor: Colors.amber[400],
        labelColor: Colors.amber[400],
        unselectedLabelColor: Colors.amber[100]!.withValues(alpha: 0.5),
        indicatorWeight: 3,
        tabs: const [
          Tab(text: "History", icon: Icon(LucideIcons.bookOpen)),
          Tab(text: "Life Today", icon: Icon(LucideIcons.sun)),
          Tab(text: "Community Voices", icon: Icon(LucideIcons.users)),
        ],
      ),
    );
  }

  Widget _buildHistoryTab() {
    return ListView(
      padding: const EdgeInsets.all(24),
      children: [
        _buildSectionHeader(LucideIcons.sparkles, "Historical Context"),
        const SizedBox(height: 16),
        Container(
          padding: const EdgeInsets.all(20),
          decoration: BoxDecoration(
            color: const Color(0xFF1E293B).withValues(alpha: 0.5),
            borderRadius: BorderRadius.circular(16),
            border: Border.all(color: Colors.amber[600]!.withValues(alpha: 0.2)),
          ),
          child: Text(
            widget.capsule.aiSummary,
            style: const TextStyle(
              fontSize: 16,
              height: 1.6,
              color: Colors.white70,
            ),
          ),
        ),
        const SizedBox(height: 32),
        if (widget.capsule.images.isNotEmpty) ...[
          _buildSectionHeader(LucideIcons.image, "Gallery"),
          const SizedBox(height: 16),
          ClipRRect(
            borderRadius: BorderRadius.circular(16),
            child: CachedNetworkImage(
              imageUrl: widget.capsule.images[0],
              height: 250,
              width: double.infinity,
              fit: BoxFit.cover,
            ),
          ),
        ]
      ],
    );
  }

  Widget _buildLifeTodayTab() {
    return ListView(
      padding: const EdgeInsets.all(24),
      children: [
        _buildSectionHeader(LucideIcons.coffee, "Life Today"),
        const SizedBox(height: 16),
        Container(
          padding: const EdgeInsets.all(20),
          decoration: BoxDecoration(
            gradient: LinearGradient(
              colors: [
                const Color(0xFF1E293B),
                const Color(0xFF0F172A),
              ],
              begin: Alignment.topLeft,
              end: Alignment.bottomRight,
            ),
            borderRadius: BorderRadius.circular(16),
            border: Border.all(color: Colors.amber[600]!.withValues(alpha: 0.3)),
          ),
          child: Text(
            widget.capsule.lifeTodaySummary,
            style: const TextStyle(
              fontSize: 16,
              height: 1.6,
              color: Colors.white,
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildCommunityVoicesTab() {
    return ListView(
      padding: const EdgeInsets.all(24),
      children: [
        if (widget.capsule.voiceNotes.isNotEmpty) ...[
          _buildSectionHeader(LucideIcons.mic, "Voice Notes"),
          const SizedBox(height: 16),
          ...widget.capsule.voiceNotes.map((vn) => _buildVoiceNoteCard(vn)).toList(),
          const SizedBox(height: 8),
        ],

        Container(
          width: double.infinity,
          margin: const EdgeInsets.only(bottom: 32),
          child: ElevatedButton.icon(
             onPressed: () {
               ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text("ElevenLabs Integration Pending")));
             },
             icon: const Icon(LucideIcons.uploadCloud, color: Colors.amber),
             label: const Text("Upload Voice Note", style: TextStyle(color: Colors.amber)),
             style: ElevatedButton.styleFrom(
               backgroundColor: const Color(0xFF1E293B),
               padding: const EdgeInsets.all(16),
               side: BorderSide(color: Colors.amber[600]!.withValues(alpha: 0.5)),
               shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
             ),
          ),
        ),

        if (widget.capsule.stories.isNotEmpty) ...[
          _buildSectionHeader(LucideIcons.penTool, "Traveler Memories"),
          const SizedBox(height: 16),
          ...widget.capsule.stories.map((story) => _buildStoryCard(story)).toList(),
          const SizedBox(height: 32),
        ],

        _buildSectionHeader(LucideIcons.messageCircle, "Ask A Local"),
        const SizedBox(height: 16),
        if (widget.capsule.questions.isNotEmpty)
          ...widget.capsule.questions.map((q) => _buildQuestionCard(q)).toList(),
        
        const SizedBox(height: 16),
        _buildAskQuestionInput(),
      ],
    );
  }

  Widget _buildVoiceNoteCard(VoiceNote vn) {
    return Container(
      margin: const EdgeInsets.only(bottom: 16),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: const Color(0xFF1E293B).withValues(alpha: 0.5),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: Colors.amber[600]!.withValues(alpha: 0.2)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              CircleAvatar(
                backgroundColor: Colors.amber[500]!.withValues(alpha: 0.2),
                child: Text(vn.author[0], style: TextStyle(color: Colors.amber[400])),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(vn.author, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 16, color: Colors.white)),
                    Text(vn.date, style: TextStyle(color: Colors.amber[200]!.withValues(alpha: 0.6), fontSize: 12)),
                  ],
                ),
              ),
              Container(
                decoration: BoxDecoration(
                  color: Colors.amber[500],
                  shape: BoxShape.circle,
                ),
                child: IconButton(
                  icon: const Icon(LucideIcons.play, color: Colors.black, size: 20),
                  onPressed: () {},
                ),
              ),
            ],
          ),
          const SizedBox(height: 16),
          // Waveform mockup
          Row(
            children: List.generate(
              30,
              (index) => Expanded(
                child: Container(
                  margin: const EdgeInsets.symmetric(horizontal: 1),
                  height: 10 + (index % 3) * 5 + (index % 2) * 8.0,
                  decoration: BoxDecoration(
                    color: Colors.amber[400]!.withValues(alpha: index < 10 ? 1.0 : 0.3),
                    borderRadius: BorderRadius.circular(2),
                  ),
                ),
              ),
            ),
          ),
          const SizedBox(height: 12),
          Text(
            '"${vn.transcription}"',
            style: const TextStyle(fontStyle: FontStyle.italic, color: Colors.white70),
          )
        ],
      ),
    );
  }

  Widget _buildStoryCard(Story story) {
    return Container(
      margin: const EdgeInsets.only(bottom: 16),
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: const Color(0xFF1E293B).withValues(alpha: 0.3),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: Colors.white24),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Icon(LucideIcons.user, size: 16, color: Colors.amber[200]),
              const SizedBox(width: 8),
              Text(
                story.author,
                style: const TextStyle(
                  fontWeight: FontWeight.bold,
                  color: Colors.white,
                ),
              ),
              const Spacer(),
              Text(
                story.date,
                style: TextStyle(
                  color: Colors.white.withValues(alpha: 0.5),
                  fontSize: 12,
                ),
              ),
            ],
          ),
          const SizedBox(height: 12),
          Text(
            story.text,
            style: const TextStyle(
              fontSize: 15,
              height: 1.5,
              color: Colors.white70,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildQuestionCard(AskALocalQuestion q) {
    return Container(
      margin: const EdgeInsets.only(bottom: 16),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: const Color(0xFF1E293B),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: Colors.blueGrey[800]!),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Icon(LucideIcons.helpCircle, size: 20, color: Colors.grey),
              const SizedBox(width: 12),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(q.author, style: const TextStyle(fontWeight: FontWeight.bold, color: Colors.grey, fontSize: 12)),
                    const SizedBox(height: 4),
                    Text(q.question, style: const TextStyle(color: Colors.white, fontSize: 15, fontWeight: FontWeight.w500)),
                  ],
                ),
              ),
            ],
          ),
          if (q.answer != null) ...[
            const SizedBox(height: 12),
            const Divider(color: Colors.white10),
            const SizedBox(height: 12),
            Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Icon(LucideIcons.checkCircle2, size: 20, color: Colors.amber[400]),
                const SizedBox(width: 12),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text("${q.answeredBy} (Local)", style: TextStyle(fontWeight: FontWeight.bold, color: Colors.amber[400], fontSize: 12)),
                      const SizedBox(height: 4),
                      Text(q.answer!, style: const TextStyle(color: Colors.white70, fontSize: 15)),
                    ],
                  ),
                ),
              ],
            ),
          ]
        ],
      ),
    );
  }

  Widget _buildAskQuestionInput() {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      decoration: BoxDecoration(
        color: const Color(0xFF0F172A),
        borderRadius: BorderRadius.circular(24),
        border: Border.all(color: Colors.white24),
      ),
      child: Row(
        children: [
          const Icon(LucideIcons.messageSquare, color: Colors.white54, size: 20),
          const SizedBox(width: 12),
          const Expanded(
            child: TextField(
              style: TextStyle(color: Colors.white),
              decoration: InputDecoration(
                hintText: "Leave a question for locals...",
                hintStyle: TextStyle(color: Colors.white54),
                border: InputBorder.none,
              ),
            ),
          ),
          IconButton(
            icon: Icon(LucideIcons.send, color: Colors.amber[400]),
            onPressed: () {},
          )
        ],
      ),
    );
  }

  Widget _buildSectionHeader(IconData icon, String title) {
    return Row(
      children: [
        Icon(icon, size: 20, color: Colors.amber[400]),
        const SizedBox(width: 12),
        Text(
          title,
          style: const TextStyle(
            fontSize: 20,
            fontWeight: FontWeight.bold,
            color: Colors.white,
          ),
        ),
      ],
    );
  }
}
