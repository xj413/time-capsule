class Story {
  final String id;
  final String author;
  final String date;
  final String text;
  final List<String>? images;

  const Story({
    required this.id,
    required this.author,
    required this.date,
    required this.text,
    this.images,
  });
}

class VoiceNote {
  final String id;
  final String author;
  final String date;
  final String transcription;
  final String duration;
  final String audioUrl; // mockup for ElevenLabs

  const VoiceNote({
    required this.id,
    required this.author,
    required this.date,
    required this.transcription,
    required this.duration,
    required this.audioUrl,
  });
}

class AskALocalQuestion {
  final String id;
  final String author;
  final String question;
  final String? answer;
  final String? answeredBy;

  const AskALocalQuestion({
    required this.id,
    required this.author,
    required this.question,
    this.answer,
    this.answeredBy,
  });
}

class CultureCapsule {
  final String id;
  final String name;
  final String country;
  final double lat;
  final double lng;
  final String aiSummary;
  final String lifeTodaySummary;
  final List<String> images;
  final List<Story> stories;
  final List<VoiceNote> voiceNotes;
  final List<AskALocalQuestion> questions;
  final String timelinePeriod;
  final String capsuleColor;

  const CultureCapsule({
    required this.id,
    required this.name,
    required this.country,
    required this.lat,
    required this.lng,
    required this.aiSummary,
    required this.lifeTodaySummary,
    required this.images,
    required this.stories,
    required this.voiceNotes,
    required this.questions,
    required this.timelinePeriod,
    required this.capsuleColor,
  });

  CultureCapsule copyWith({
    String? id,
    String? name,
    String? country,
    double? lat,
    double? lng,
    String? aiSummary,
    String? lifeTodaySummary,
    List<String>? images,
    List<Story>? stories,
    List<VoiceNote>? voiceNotes,
    List<AskALocalQuestion>? questions,
    String? timelinePeriod,
    String? capsuleColor,
  }) {
    return CultureCapsule(
      id: id ?? this.id,
      name: name ?? this.name,
      country: country ?? this.country,
      lat: lat ?? this.lat,
      lng: lng ?? this.lng,
      aiSummary: aiSummary ?? this.aiSummary,
      lifeTodaySummary: lifeTodaySummary ?? this.lifeTodaySummary,
      images: images ?? this.images,
      stories: stories ?? this.stories,
      voiceNotes: voiceNotes ?? this.voiceNotes,
      questions: questions ?? this.questions,
      timelinePeriod: timelinePeriod ?? this.timelinePeriod,
      capsuleColor: capsuleColor ?? this.capsuleColor,
    );
  }
}
