// ============================================================================
// RealEye — Exercises Data
// ============================================================================
// This file defines all content for RealEye rounds and the Tell Library.
//
// STRUCTURE:
//   - rounds: array of round objects, each focused on a single tell
//   - tellLibrary: array of all tell categories (6 total; only 1 implemented for demo)
//
// COORDINATE CONVENTION:
//   All image coordinates (hotspots, highlight regions, zoom crops, hint regions)
//   use PERCENTAGES (0-100) relative to the image's intrinsic dimensions.
//   This keeps positioning responsive across screen sizes.
//
// FIELDS TO FILL IN (marked with TODO comments):
//   - Coordinates for hotspots, highlights, zooms, hint regions
// ============================================================================
export const BASE = import.meta.env.BASE_URL

export const rounds = [
  {
    id: "round-1-hands-fingers",
    roundNumber: 1,
    tellId: "hands-fingers",

    // ========================================================================
    // PHASE 1 — EXAMINE
    // ========================================================================
    phase1: {
      imageA: {
        src: `${BASE}images/round1/phase1-a.jpg`,
        isAI: false,
      },
      imageB: {
        src: `${BASE}images/round1/phase1-b.jpg`,
        isAI: true,
      },

      // Instruction copy shown above the contrasting pair
      instruction: "Look at these two photos.",
      prompt: "One of these is AI-generated. Which do you think it is?",
      subPrompt: "Click a photo to select it, then confirm your choice.",

      // Copy shown immediately after learner confirms their photo choice
      correctPhotoFeedback: "Correct — Photo B is AI-generated.",
      wrongPhotoFeedback:
        "Actually, Photo B is the AI-generated one. This pair is subtle — let's take a closer look together.",

      // The 5-option selection list shown after correct photo is picked.
      // `isCorrect: true` = real tell in this image
      // `isCorrect: false` = plausible but not the main giveaway
      // `isCorrect: null` = meta-response (neither right nor wrong)
      tellSelectionPrompt:
        "What made you pick that one? Select anything that stood out.",
      tellOptions: [
        { id: "hands-fingers", label: "Hands & fingers", isCorrect: true },
        {
          id: "skin-texture",
          label: "Skin texture or smoothness",
          isCorrect: false,
        },
        {
          id: "background",
          label: "Background continuity",
          isCorrect: false,
        },
        {
          id: "felt-off",
          label: "Something felt off but I can't say what",
          isCorrect: null,
        },
        { id: "guessed", label: "I guessed", isCorrect: null },
      ],

      // Acknowledgment copy shown after tell selection, before moving to Phase 2.
      // Selection logic:
      //   - If any option with isCorrect:true is selected → use `correctTell`
      //   - Else if any option with isCorrect:false is selected → use `plausibleWrong`
      //   - Else if `felt-off` is selected → use `feltOff`
      //   - Else (`guessed` only) → use `guessed`
      acknowledgments: {
        correctTell:
          "Good eye — you noticed something about the hands. Let's take a closer look at what's going on.",
        plausibleWrong:
          "That's a reasonable thing to notice — AI images can have issues there too. But the clearest giveaway in this image is something else. Let's look.",
        feltOff:
          "That instinct is worth paying attention to. Let's figure out what you were picking up on.",
        guessed:
          "That's honest — and guessing is where everyone starts. By the end of this round, you'll have something specific to look for.",
      },

      continueButtonText: "Continue",
    },

    // ========================================================================
    // PHASE 2 — LEARN
    // ========================================================================
    phase2: {
      // --------------------------------------------------------------------
      // Beat 1: Name & frame the tell
      // --------------------------------------------------------------------
      beat1: {
        tellName: "Hands & Fingers",
        tellIcon: "👋",
        definition:
          "One of the most common giveaways in AI-generated images is hands. AI often produces hands with the wrong number of fingers, fingers that bend in impossible ways, or hands that blur into other objects.",
        whyHeading: "Why does this happen?",
        whyExplanation:
          "AI image generators learn by studying millions of photos, but they don't actually understand what they're drawing. They know a hand tends to appear at the end of an arm and has finger-like shapes — but they don't know a hand has exactly five fingers, or how finger joints actually bend. So they produce something that looks roughly hand-shaped, which often falls apart when you look closely.",
      },

      // --------------------------------------------------------------------
      // Beat 2: Show the tell in the current (Phase 1) image
      // --------------------------------------------------------------------
      beat2: {
        // Reuses the Phase 1 AI image
        imageSrc: `${BASE}images/round1/phase1-b.jpg`,

        introText: "Here's what you might have noticed in this image:",

        // Highlight rectangle on the full image — draws eye to the region
        highlightRegion: {
          x: 58,
          y: 37,
          width: 14,
          height: 30,
        },

        // Manually cropped image - just  file path now, no coordinate math
        zoomSrc: `${BASE}images/round1/phase1-b-zoom.jpg`,

        // Optional arrow annotation on the zoom-in
        // Set to null to omit
        zoomAnnotation: {
          text: "arm ends here",
          // Position within the zoom crop, as percentages of the crop
          arrowX: 55,
          arrowY: 66,
        },

        directionalHeading: "Look at the girl in the blue shirt.",
        annotationText:
          "Her right arm ends at the elbow — there's no forearm, no hand, no pencil. She appears to be in a pose that would require both hands to use, but one arm is simply missing.\n\nThis is a classic AI failure: the model generated a plausible pose but lost track of whether all the body parts were actually present. AI doesn't count limbs the way humans do.",

        backgroundTeaser:
          "There are a few more hands-and-fingers problems hiding further back in this image. See if you can spot them in the next step.",
      },

      // --------------------------------------------------------------------
      // Beat 3: Worked examples from other images
      // --------------------------------------------------------------------
      beat3: {
        introText:
          "Hands-and-fingers problems show up in many ways. Here are a couple examples from other AI-generated images:",
        examples: [
          {
            src: `${BASE}images/round1/worked-example-1.jpg`,
            label: "Extra finger",
            annotation:
              "This hand has six fingers — one too many. AI often miscounts because it's generating what 'looks right' without checking.",
          },
          {
            src: `${BASE}images/round1/worked-example-2.jpg`,
            label: "Fused fingers",
            annotation:
              "These fingers blur into each other with no clear separation. AI struggles to keep fine details distinct when they're close together.",
          },
        ],
      },

      // --------------------------------------------------------------------
      // Beat 4: Bridge to Practice
      // --------------------------------------------------------------------
      beat4: {
        bridgeHeading: "Now you know what to look for.",
        bridgeText: "Let's practice spotting this tell in a few more images to unlock this card.",
        buttonText: "Start practicing",
      },
    },

    // ========================================================================
    // PHASE 3 — PRACTICE
    // ========================================================================
    phase3: {
      // Shown above each practice image
      instruction:
        "Find the hands-and-fingers problems in this image. Click where you see the tell.",

      // Shown briefly when a wrong click is placed (fades out after ~2s)
      wrongClickText: "Not quite — keep looking.",

      // Hint tooltip shown when hint button is clicked
      hintTooltip: "Look more closely in this area.",

      // Modal shown when learner clicks "Reveal"
      revealConfirmModal: {
        heading: "Show where the tell is?",
        body: "The tell location will be revealed. You'll still move on to the next image.",
        cancelText: "Keep trying",
        confirmText: "Yes, show me",
      },

      // Button text for the last image — triggers RoundComplete
      completeButtonText: "Complete Round",

      // --------------------------------------------------------------------
      // Practice images (3 total for demo)
      // Each image: learner clicks to find the primary tell (find-until-solved).
      // Wrong clicks get immediate gray marker + wrongClickText feedback.
      // Correct click triggers successMessage + bonusTells reveal (if any).
      // Reveal button shows primaryTell location if learner gives up.
      // After success or reveal, Continue button advances to next image.
      // After final image, Complete Round triggers Tell Library unlock.
      // --------------------------------------------------------------------
      images: [
        {
          id: "practice-1",
          src: `${BASE}images/round1/practice-1.jpg`,

          // The tell the learner must find. Success triggered on correct click.
          primaryTells: [
            {
              id: "h1",
              x: 66,       // TODO: set coordinates once image is placed
              y: 70,
              width: 10,
              height: 11,
              // Shown immediately on correct click
              successMessage:
                "Nice find! Look at the hand gripping the suitcase — only three knuckles " +
                "are visible where there should be four across the back of the hand.",
              // Shown if learner clicks Reveal instead of finding it themselves
              revealAnnotation:
                "Look at the hand gripping the suitcase — only three knuckles are visible, " +
                "where there should be four across the back of the hand. AI often skips " +
                "anatomical details that would be obvious to anyone who's looked at their " +
                "own hand.",
            },
          ],

          revealIntroText: null,

          // Hint region highlighted when hint button is clicked
          // TODO: set coordinates once image is placed
          hintRegion: {
            x: 55,
            y: 60,
            width: 30,
            height: 30,
          },
        },
        {
          id: "practice-2",
          src: `${BASE}images/round1/practice-2.jpg`,

          // Both locations are findable — clicking either one triggers success.
          // The unfound one fades in as a bonus reveal afterward.
          primaryTells: [
            {
              id: "h1",
              x: 20,
              y: 52,
              width: 11,
              height: 15,
              successMessage:
                "Nice find! Those fingers are unnaturally long and taper in a way " +
                "real fingers don't — AI sometimes gets the count right but fails on proportion.",
              revealAnnotation:
                "Look at the right hand of the second woman from the right. Their fingers are " +
                "unnaturally long — stretching nearly the full height of the candle — and " +
                "taper in a way real fingers don't. AI sometimes gets the number of fingers " +
                "right but fails on proportion.",
            },
            {
              id: "h2",
              x: 32,
              y: 52,
              width: 10,
              height: 16,
              successMessage:
                "Nice find! Those fingers blur and merge into each other with no clear " +
                "separation — AI struggles to keep adjacent fingers distinct.",
              revealAnnotation:
                "Look at the left hand of the third woman from the right. The fingers blur " +
                "and merge into each other with no clear separation. This is AI struggling " +
                "to keep adjacent fingers distinct — a common failure when hands are " +
                "touching objects or each other.",
            },
          ],

          revealIntroText: "This image actually has one more hands-and-fingers tell. Can you see it now?",

          hintRegion: {
            x: 15,
            y: 45,
            width: 40,
            height: 40,
          },
        },
        {
          id: "practice-3",
          src: `${BASE}images/round1/practice-3.jpg`,

          primaryTells: [
            {
              id: "h1",
              x: 55,       // TODO: set coordinates
              y: 55,
              width: 12,
              height: 19,
              successMessage:
                "Nice find! That hand has a thumb and index finger but is missing the ring " +
                "finger and pinky — AI can generate several correct hands in a scene and " +
                "still fail on one.",
              revealAnnotation:
                "Look at the pointing hand on the right. It has a thumb, an index finger, " +
                "and a middle finger — but no ring finger or pinky. The other hands in the " +
                "image look fine, which makes this one easy to miss. AI can generate " +
                "several correct hands in a scene and still fail on one — the failures " +
                "aren't always consistent across an image.",
            },
          ],

          revealIntroText: null,

          hintRegion: {
            x: 30,
            y: 45,
            width: 60,
            height: 40,
          },
        },
      ],
    },
  },
];

// ============================================================================
// TELL LIBRARY
// ============================================================================
// All 6 tell categories. Only "hands-fingers" has unlockRoundId set in the demo;
// the others show as "Coming soon" in the UI.
// ============================================================================

export const tellLibrary = [
  {
    id: "hands-fingers",
    name: "Hands & Fingers",
    icon: "👋",
    shortTagline:
      "AI often produces hands with the wrong number of fingers or impossible poses.",
    subTypes: [
      {
        name: "Extra or missing fingers",
        description:
          "AI often miscounts fingers, producing 4 or 6 instead of 5.",
      },
      {
        name: "Fused fingers",
        description:
          "Fingers blur into each other with no clear separation, especially when they overlap.",
      },
      {
        name: "Impossible poses",
        description: "Joints bend at angles real anatomy can't achieve.",
      },
      {
        name: "Missing limbs",
        description:
          "Arms or hands simply disappear from the body, especially in complex poses.",
      },
    ],
    unlockRoundId: "round-1-hands-fingers",
  },
  {
    id: "background-continuity",
    name: "Background Continuity",
    icon: "🌄",
    shortTagline:
      "AI struggles to keep backgrounds consistent across an image.",
    subTypes: [],
    unlockRoundId: null, // not implemented in demo
  },
  {
    id: "object-details",
    name: "Object Details",
    icon: "🎨",
    shortTagline:
      "AI gets small mechanical or decorative details wrong.",
    subTypes: [],
    unlockRoundId: null,
  },
  {
    id: "skin-texture",
    name: "Skin Texture",
    icon: "💆",
    shortTagline:
      "AI skin often looks unnaturally smooth and uniform.",
    subTypes: [],
    unlockRoundId: null,
  },
  {
    id: "clothing",
    name: "Clothing Inconsistencies",
    icon: "🧵",
    shortTagline:
      "AI clothing has buttons, seams, or patterns that don't quite make sense.",
    subTypes: [],
    unlockRoundId: null,
  },
  {
    id: "impossible-geometry",
    name: "Impossible Geometry",
    icon: "📐",
    shortTagline:
      "AI produces architectural features and perspectives that don't hold up.",
    subTypes: [],
    unlockRoundId: null,
  },
];

// ============================================================================
// APP-LEVEL COPY
// ============================================================================
// Copy that isn't tied to a specific round — home page, navigation, round
// completion screen, etc.
// ============================================================================

export const appCopy = {
  home: {
    title: "RealEye",
    intro:
      "AI-generated photos are everywhere now — in scams, social media, and news. RealEye teaches you what to look for so you can tell them apart from real ones.",
    howItWorksHeading: "Here's how it works:",
    steps: [
      {
        label: "Examine",
        description: "look at two photos and decide which is AI-generated",
      },
      {
        label: "Learn",
        description: "understand what gave it away",
      },
      {
        label: "Practice",
        description: "spot the same tell in new images",
      },
    ],
    startButtonText: "Start learning tells",
    libraryHeading: "Your Tell Library",
    libraryProgressText: (earned, total) =>
      `You've learned ${earned} of ${total} tells.`,
  },

  tellCard: {
    viewDetailsText: "View details →",
    lockedText: "Coming soon",
    continueText: "Continue →",
    // Progress labels for in-progress cards
    progressLabels: {
      examine: "In progress: Examine",
      learn: (beat) => `In progress: Learn (Beat ${beat} of 4)`,
      practice: (current, total) =>
        `In progress: Practice (${current} of ${total} images)`,
    },
  },

  tellDetail: {
    subTypesHeading: "Common sub-types:",
    examplesHeading: "Examples:",
    backText: "← Back to library",
  },

  roundComplete: {
    heading: "🎉 Round complete!",
    subheading: (tellName) => `You've learned to spot the ${tellName} tell.`,
    earnedLabel: "✓ Earned",
    learnAnotherText: "Learn another tell",
    learnAnotherDisabledSubtext: "Additional tells coming soon",
    backHomeText: "Back to home",
  },

  navigation: {
    homeTooltip: "Return to home — your progress will be saved",
    backText: "← Back",
    nextText: "Next →",
  },

  errors: {
    storageFailure:
      "Your progress couldn't be saved this time. You can still continue — just know that if you close the page, you may need to start over.",
    imageLoadFailure: "Image couldn't load. Try refreshing the page.",
  },
};