#!/usr/bin/env python3
"""Generates the AI by MMC hub and six service pages as static HTML.
Run: python3 build.py   (writes *.html next to this file; images go in assets/img/<name>.jpg)
Copy rules: no invented results, prices, counts or awards; no em dashes."""
import html, json, os

ROOT = os.path.dirname(os.path.abspath(__file__))
SITE = "https://www.mondaymarketing.company"
e = html.escape

def slot(name, brief, kind="", tag=""):
    cls = "slot" + (" slot--" + kind if kind else "")
    t = f'<span class="slot__tag">{e(tag)}</span>' if tag else ""
    return (f'<figure class="{cls}">{t}<img src="assets/img/{name}.jpg" alt="{e(brief)}" loading="lazy" decoding="async">'
            f'<figcaption class="slot__brief"><b>Image needed: {e(name)}.jpg</b>{e(brief)}</figcaption></figure>')

def vslot(name, brief, video_note):
    """Video slot: image now; set data-video to a file later and the slot plays it."""
    s = slot(name, brief, "v", "Video later")
    return s.replace('<figure class="slot slot--v"', '<figure class="slot slot--v" data-video="" data-video-note="%s"' % e(video_note), 1)

SERVICES = [
    dict(slug="ai-photoshoot", name="AI Photoshoot", short="One photo, every scene", ico="camera"),
    dict(slug="ai-video-generation", name="AI Video Generation", short="Ad films without a shoot", ico="film"),
    dict(slug="ai-sales-agent", name="AI Sales Agent", short="Answers and qualifies leads", ico="chat"),
    dict(slug="ai-ugc", name="AI UGC", short="Creator-style clips at scale", ico="phone"),
    dict(slug="ai-landing-page-builder", name="AI Landing Page Builder", short="A page for every campaign", ico="page"),
    dict(slug="ai-spokesperson-video", name="AI Spokesperson Video", short="A presenter that speaks for you", ico="mic"),
]

PAGES = {}

PAGES["ai-photoshoot"] = dict(
    title="AI Photoshoot for Brands | AI by MMC",
    desc="Turn one real product photo into every scene your campaigns need. AI photoshoots for D2C, B2B and education brands from MMC.",
    h1="One photo. Every scene your campaign needs.",
    sub="Send us one real photo of your product, your team or your campus. We build the lifestyle, studio and seasonal scenes around it, and your team approves each one before it goes live.",
    hero=("photoshoot", [
        ("photoshoot-hero-1", "A pink DEWLEAF serum bottle and box on a marble bathroom shelf, soft window light, morning steam", ""),
        ("photoshoot-hero-2", "The same DEWLEAF serum bottle held in a hand against a bright yellow backdrop", ""),
        ("photoshoot-hero-3", "The same DEWLEAF bottle and box on a wooden picnic table with watermelon, green leaves in soft focus", "")]),
    answer="An AI photoshoot takes one real photograph and generates many new scenes around it: different backgrounds, settings, seasons and formats. MMC builds them, keeps the product looking like the product, and hands over files sized for ads, marketplaces and your website. You approve every scene before it is used.",
    steps=[("Send the base photo", "One clear photo of the product, person or place. Your real subject stays the anchor.", "photoshoot-step-1", "A single product photo on a plain white table next to a phone showing the upload screen"),
           ("Choose the scenes", "Tell us where the brand lives: kitchen, street, campus, festival, studio. We propose a scene list.", "photoshoot-step-2", "A pinboard of scene reference photos: kitchen counter, street cafe, festival lights, studio backdrop"),
           ("We generate and refine", "Scenes are built, checked against your real product, and corrected until they look right.", "photoshoot-step-3", "A designer's screen showing a product image side by side with three generated scene variations"),
           ("Receive channel-ready files", "Square, vertical and wide crops for ads, marketplaces and the website.", "photoshoot-step-4", "A laptop, a phone and a tablet each showing the same product in a different crop")],
    gets=[("Many scenes, one shoot day saved", "Season, location and mood change without a new set."),
          ("A consistent look", "Light, colour and framing stay on brand across every image."),
          ("Ready for every channel", "Ads, marketplace listings, website banners and email."),
          ("You stay in control", "Nothing is used until your team approves it.")],
    gets_imgs=["photoshoot-get-1", "photoshoot-get-2", "photoshoot-get-3", "photoshoot-get-4"],
    gets_briefs=["A kitchen counter with a jar of sauce, morning light, cutting board and herbs",
                 "Four product images in a neat grid, matching warm colour grading",
                 "A marketplace product listing page on a phone next to a website banner on a laptop",
                 "A marketer's hand ticking approval boxes on a printed contact sheet"],
    use=[("D2C brands", "Launch a product in ten settings without booking a studio, and refresh the range each season.", "photoshoot-use-d2c", "A sneaker on a city rooftop at golden hour, with a second frame of it on a studio pedestal"),
         ("B2B companies", "Team portraits, office scenes and product-in-use images for decks, sites and case studies.", "photoshoot-use-b2b", "A professional in a modern office beside a piece of industrial equipment, consistent lighting"),
         ("Colleges and education brands", "Campus, classroom and student-life scenes for admissions creatives and course pages.", "photoshoot-use-edu", "Students walking across a sunlit campus quad with a library building behind them")],
    faqs=[("What do you need from us to start?", "One clear, high-resolution photo of the product, person or place, plus a list of the scenes you want."),
          ("Will the product still look like our product?", "We start from your real photo and check every scene against it. Anything that drifts from the real product is corrected or dropped before you see it."),
          ("Can we use the images in paid ads?", "Yes. We format the files for ad platforms, marketplaces and your website. Check each platform's current rules on AI-generated imagery, and we will flag anything relevant."),
          ("How long does it take?", "It depends on the number of scenes and the rounds of changes. We confirm the timing when we scope the work."),
          ("Do you also run the ads?", "We can. AI by MMC sits next to our performance marketing, so images can go straight into testing and reporting.")],
)

PAGES["ai-video-generation"] = dict(
    title="AI Video Generation for Ads and Brand Films | AI by MMC",
    desc="Ad films, product videos and explainers made with AI, without a full production shoot. Built by MMC for D2C, B2B and education brands.",
    h1="Ad films without the film shoot.",
    sub="Scripts, visuals, motion and sound, produced with AI and directed by our team. Product videos, brand films and explainers, made for the placements you actually run.",
    hero=("video", [
        ("video-hero-1", "A vertical frame of a toothpaste tube with tiny cartoon workers polishing a giant tooth", ""),
        ("video-hero-2", "A 3D-rendered modern kitchen with a slow camera push toward a glowing appliance", ""),
        ("video-hero-3", "An animated mascot character waving beside a brand storefront", "")]),
    answer="AI video generation is making video from scripts, images and prompts instead of cameras and sets. MMC writes the concept, builds the shots with AI tools, edits them together with sound, and delivers cuts sized for Reels, Shorts, connected TV and your site. A senior editor reviews every frame.",
    steps=[("Brief and script", "We turn your product and goal into a short script and shot list.", "video-step-1", "A storyboard pinned to a wall: six rough frames with short captions"),
           ("Generate the shots", "Each scene is generated, then checked for realism, brand colour and product accuracy.", "video-step-2", "A video editor's timeline with several generated clips being reviewed on a monitor"),
           ("Edit and sound", "Cut, colour, add music, voice-over and captions.", "video-step-3", "An editing suite with waveform, captions track and colour wheels on screen"),
           ("Deliver every size", "Vertical, square and wide versions for every placement.", "video-step-4", "Three phones and a wide monitor each playing the same ad in its own format")],
    gets=[("Motion for any idea", "Product worlds, mascots and stylised scenes that a camera cannot easily capture."),
          ("Fast to change", "New offer, new line, new language: regenerate the shot, not the whole shoot."),
          ("Made to be tested", "Several hooks of the same film for the ad account to compare."),
          ("Brand-safe", "Human review for likeness, logos, claims and sound before anything ships.")],
    gets_imgs=["video-get-1", "video-get-2", "video-get-3", "video-get-4"],
    gets_briefs=["A single product floating in a colourful 3D world, lit from below",
                 "Four thumbnails of one ad in different seasonal colour schemes",
                 "A grid of six video thumbnails of the same product with different opening hooks",
                 "A reviewer's desk with a checklist beside a monitor paused on a video frame"],
    use=[("D2C brands", "Product films, launch teasers and seasonal ads for Reels and Shorts.", "video-use-d2c", "A vertical frame of a snack brand's pack exploding into colourful ingredients"),
         ("B2B companies", "Explainers and product walkthroughs that make a complex offer easy to follow.", "video-use-b2b", "An animated dashboard walkthrough with clean icons on a dark blue background"),
         ("Colleges and education brands", "Campus stories and course explainers for admissions season.", "video-use-edu", "A stylised campus fly-through with a banner that reads Open Day")],
    faqs=[("What kinds of video can AI make for us?", "Product films, ad hooks, explainers, mascot animations and stylised brand stories. Live footage of real people is a different job and we will tell you when a real shoot is the better fit."),
          ("Do you use our real product?", "Yes. We build from your product images and check every shot against them."),
          ("Can videos be made in different languages?", "Voice-over and captions can be produced in the languages your audience uses. We confirm the language list when we scope the work."),
          ("Who owns the video?", "Ownership and usage terms are agreed in the project scope."),
          ("Can you run the ads too?", "Yes. Video sits inside our performance loop, so hooks are tested and reported on.")],
)

PAGES["ai-sales-agent"] = dict(
    title="AI Sales Agent: Chat and WhatsApp Lead Qualification | AI by MMC",
    desc="An AI sales agent that answers questions, qualifies enquiries and books calls on your website and WhatsApp. Built by MMC for D2C, B2B and education.",
    h1="A sales agent that answers while you sleep.",
    sub="Every enquiry gets a quick, useful reply. Our AI sales agent answers common questions, asks the right qualifying questions and passes real prospects to your team, on your website and WhatsApp.",
    hero=("sales", [
        ("sales-hero-1", "A chat window on a phone: a customer asks about delivery and gets a friendly, short reply", ""),
        ("sales-hero-2", "A website chat bubble open on a laptop showing a course enquiry conversation", ""),
        ("sales-hero-3", "A CRM card showing a qualified lead with name, need and preferred call time", "")]),
    answer="An AI sales agent is a chat assistant trained on your products, prices policy and FAQs. It replies to enquiries at once, asks qualifying questions, and hands the good ones to your team with the context filled in. MMC builds it, connects it to your CRM and tracks what it converts.",
    steps=[("Capture", "The agent greets every visitor and WhatsApp message, at any hour.", "sales-step-1", "A phone lock screen showing three new WhatsApp enquiries at night"),
           ("Qualify", "It asks a few short questions: need, budget range, timeline.", "sales-step-2", "A chat thread where the agent asks two quick qualifying questions and the customer taps replies"),
           ("Engage", "It answers objections from your approved answers and books the call.", "sales-step-3", "A calendar showing a call booked by the chat, with a confirmation message"),
           ("Hand over", "Your team gets the conversation and the lead details in the CRM.", "sales-step-4", "A sales manager's laptop with a CRM lead card and the chat transcript beside it")],
    gets=[("Fast first replies", "Nobody waits for morning to hear back."),
          ("Cleaner leads", "Your team talks to people who fit, with context already noted."),
          ("Speaks your language", "Answers in the tone and languages your customers use."),
          ("Measured", "Conversations, qualified leads and bookings show up in reporting.")],
    gets_imgs=["sales-get-1", "sales-get-2", "sales-get-3", "sales-get-4"],
    gets_briefs=["A shop owner asleep while a phone on the bedside table glows with a chat reply",
                 "A CRM board with lead cards sorted into new, qualified and booked columns",
                 "A chat on a phone with the reply in Hindi and English side by side",
                 "A reporting dashboard with conversation and booking counts as simple bars"],
    use=[("D2C brands", "Product questions, sizing, delivery and order help on WhatsApp and the store.", "sales-use-d2c", "A phone showing a chat about shoe sizing with product photos shared in the thread"),
         ("B2B companies", "Qualify inbound demo requests and book them with the right person.", "sales-use-b2b", "A website demo request form beside a chat asking about team size and use case"),
         ("Colleges and education brands", "Answer course, fee and eligibility questions from parents at any hour and book counsellor calls.", "sales-use-edu", "A parent's phone with a chat about course eligibility and a counsellor call booking")],
    integrations=["Gmail", "WhatsApp", "HubSpot", "Salesforce", "Zoho", "Google Sheets", "Calendly", "Slack", "Shopify", "Meta Lead Ads"],
    faqs=[("What can the agent do?", "Answer questions from the material you approve, ask qualifying questions, share links and book calls. It hands over to a person when a conversation needs one."),
          ("Where does it run?", "On your website and on WhatsApp. Other channels can be scoped."),
          ("Will it make things up?", "It answers from the content you approve. Where it does not know, it says so and hands over."),
          ("Does it connect to our CRM?", "Yes. We connect it to the tools you already use and confirm the list when we scope the work."),
          ("Who sets it up?", "MMC does, and we keep improving it from the conversations it has.")],
)

PAGES["ai-ugc"] = dict(
    title="AI UGC Videos for Ads and Social | AI by MMC",
    desc="Creator-style UGC videos made with AI, in the languages your customers use. Testable, on-brand clips built by MMC for D2C, B2B and education brands.",
    h1="Creator-style videos, without chasing creators.",
    sub="Hooks, testimonials-style clips and product demos in the voice of a real customer, made with AI and tested in your ad account. Hinglish, English and regional languages included. Shown here on two example beauty brands, DEWLEAF and VELVETTE.",
    hero=("ugc", [
        ("ugc-hero-1", "A woman applying the DEWLEAF serum in a bright bathroom, talking to camera, vertical phone framing", ""),
        ("ugc-hero-2", "A makeup creator at a ring-lit vanity holding the VELVETTE foundation up to camera", ""),
        ("ugc-hero-3", "A creator unboxing the DEWLEAF serum box at a desk, smiling to camera", "")]),
    answer="AI UGC is user-generated-style video, the kind a real customer might film on a phone, produced with AI avatars and voices instead of hiring and briefing creators. MMC writes the scripts, produces the clips, and sets them up as ad variants so you can see which hooks work.",
    steps=[("Pick the angles", "We choose the problems, hooks and proof points worth testing.", "ugc-step-1", "A whiteboard with five hook ideas written on sticky notes"),
           ("Write the scripts", "Short, spoken-style scripts in the language your buyer uses.", "ugc-step-2", "A script page with spoken-style lines and camera notes"),
           ("Produce the clips", "Presenters, voices, captions and product shots come together.", "ugc-step-3", "A vertical video timeline with a presenter, subtitle track and product cutaway"),
           ("Launch and learn", "Variants go into your ad account. Winners get more, losers stop.", "ugc-step-4", "An ad account table with four video variants and one highlighted as the winner")],
    gets=[("Many variants, quickly", "Different hooks, different faces, same offer."),
          ("Language that fits", "Hinglish, English and regional languages."),
          ("Built for testing", "Named, tracked and reported like every other MMC creative."),
          ("No creator logistics", "No shipping, scheduling or reshoots.")],
    gets_imgs=["ugc-get-1", "ugc-get-2", "ugc-get-3", "ugc-get-4"],
    gets_briefs=["Six vertical clip thumbnails in a row, each with a different presenter",
                 "A phone screen with captions in Hindi and English over a talking clip",
                 "A spreadsheet of ad variants with hook names and a tracking column",
                 "An empty courier box and a calendar, crossed out, beside a finished video"],
    use=[("D2C brands", "Problem and solution clips, unboxings and how-to-use videos for the feed.", "ugc-use-d2c", "A creator-style vertical clip of someone applying a face serum in a bathroom mirror"),
         ("B2B companies", "Short founder-style and customer-style explainers for LinkedIn and paid social.", "ugc-use-b2b", "A person at a standing desk speaking to camera about a software workflow"),
         ("Colleges and education brands", "Student-style walkthroughs of campus, courses and admissions steps.", "ugc-use-edu", "A student in a hostel room talking to camera, campus visible through the window")],
    faqs=[("Is this real people or AI?", "The presenters and voices are AI-generated. We label content as the platforms and the law require and we will advise on disclosure."),
          ("Can we use our own spokesperson?", "That is a separate service, AI Spokesperson Video, and it is built from a real person's approved footage."),
          ("Which languages?", "Hinglish, English and a range of regional languages. We confirm your list when we scope the work."),
          ("Can we run these as paid ads?", "Yes. We build them for ad accounts and check each platform's current rules."),
          ("What do you need from us?", "The product or course, a few claims you can stand behind, and access to the ad account if you want us to launch.")],
)

PAGES["ai-landing-page-builder"] = dict(
    title="AI Landing Page Builder for Campaigns | AI by MMC",
    desc="Campaign landing pages generated, refined and launched quickly with AI. Built by MMC for D2C, B2B and education brands, with conversion tracking included.",
    h1="A landing page for every campaign, live fast.",
    sub="Every ad set deserves a page that speaks to it. We generate, refine and launch campaign landing pages with AI, tuned for conversion and connected to your tracking.",
    hero=("lp", [
        ("lp-hero-1", "A laptop showing a clean D2C landing page with a bold headline, product image and buy button", ""),
        ("lp-hero-2", "A phone showing a mobile-first enquiry page for a college course with a short form", ""),
        ("lp-hero-3", "A tablet showing a B2B landing page with a demo request form beside a product screenshot", "")]),
    answer="An AI landing page builder generates page copy and layouts from a brief, so many pages can be made and tested in the time one used to take. MMC uses it to produce pages per campaign, then refines them by hand, connects forms and analytics, and reports on which pages convert.",
    steps=[("Discover", "We read your offer, audience and the ad that sends people here.", "lp-step-1", "A strategist's notebook open beside an ad mockup on a monitor"),
           ("Define", "We agree the promise, proof, structure and one action for the page.", "lp-step-2", "A wireframe sketch of a landing page with sections labelled hero, proof, form"),
           ("Generate", "AI drafts copy and layouts. We choose the strongest directions.", "lp-step-3", "Three landing page drafts side by side on one screen"),
           ("Refine and launch", "Editing, speed checks, tracking and live launch.", "lp-step-4", "A launch checklist with form test, tracking and mobile check ticked")],
    gets=[("A page per audience", "Message match between the ad and the page."),
          ("Fast to test", "Variants go live without a design queue."),
          ("Mobile first", "Short forms and clear actions on a phone."),
          ("Tracked", "Forms, calls and WhatsApp clicks feed your reporting.")],
    gets_imgs=["lp-get-1", "lp-get-2", "lp-get-3", "lp-get-4"],
    gets_briefs=["An ad on a phone next to the landing page it leads to, headline matching",
                 "Two versions of the same page shown as A and B on a screen",
                 "A phone showing a two-field enquiry form with a large button",
                 "A tracking view with form, call and WhatsApp click events listed"],
    use=[("D2C brands", "Product, offer and festival pages for each ad set.", "lp-use-d2c", "A festival sale landing page on a laptop with a countdown and product grid"),
         ("B2B companies", "Demo and lead-magnet pages for each segment and campaign.", "lp-use-b2b", "A whitepaper download page with a cover mockup and a short form"),
         ("Colleges and education brands", "Course and intake pages for each city and programme.", "lp-use-edu", "A course landing page with fee summary, eligibility and an apply-now button")],
    faqs=[("Do you build on our website or separately?", "Either. We scope it with your team and your tools."),
          ("Can you match our brand?", "Yes. Pages follow your brand rules and we review every page before it goes live."),
          ("How do you handle forms and CRM?", "Forms connect to your CRM and to conversion tracking, so leads can be judged by quality."),
          ("How fast can pages be made?", "Much faster than a manual design queue. We confirm timing when we scope the work."),
          ("Can you test versions?", "Yes. Variants are set up as tests and reported on.")],
)

PAGES["ai-spokesperson-video"] = dict(
    title="AI Spokesperson Video: A Presenter That Speaks for You | AI by MMC",
    desc="Turn a script into a presenter video in any language you need. AI spokesperson videos for D2C, B2B and education brands, made by MMC.",
    h1="A presenter who speaks for your brand, on demand.",
    sub="Give us the script. We turn it into a presenter video, in the language and tone your audience expects, without booking a studio or a speaker each time.",
    hero=("spokes", [
        ("spokes-hero-1", "A presenter in a smart blue jacket speaking to camera in a bright studio with a soft blurred office behind", ""),
        ("spokes-hero-2", "A presenter in a kurta speaking to camera in front of a warm shop shelf", ""),
        ("spokes-hero-3", "A presenter in a blazer speaking to camera with a campus building in the background", "")]),
    answer="An AI spokesperson video is a talking-presenter video generated from a script. MMC writes and approves the script with you, produces the presenter video with matching voice and lip movement, adds captions and branding, and delivers versions in the languages you need.",
    steps=[("Write the script", "We shape your message into a short, spoken script.", "spokes-step-1", "A script on a tablet beside a microphone and a cup of tea"),
           ("Choose the presenter", "Pick the look, voice and language that fits your audience.", "spokes-step-2", "A screen showing six presenter thumbnails with a voice list beside them"),
           ("Generate and check", "Video, voice and lip movement are produced and reviewed.", "spokes-step-3", "A reviewer watching a presenter video on a monitor with playback controls"),
           ("Brand and deliver", "Captions, logo, background and every format you need.", "spokes-step-4", "A finished presenter video with captions and logo shown in phone and wide formats")],
    gets=[("Consistent messaging", "The same clear presenter across every video."),
          ("Many languages", "One script, produced for the languages your buyers use."),
          ("Update in minutes, not days", "Change a line of the script and regenerate."),
          ("Branded", "Your colours, logo and captions on every version.")],
    gets_imgs=["spokes-get-1", "spokes-get-2", "spokes-get-3", "spokes-get-4"],
    gets_briefs=["Three presenter videos in a row with the same script, different backgrounds",
                 "A single script mapped to English, Hindi and Marathi video thumbnails",
                 "A script editor with one line highlighted and a regenerate button",
                 "A presenter video with a logo watermark and a captions bar at the bottom"],
    use=[("D2C brands", "Product explainers, offer announcements and how-to videos.", "spokes-use-d2c", "A presenter beside a floating product with three feature callouts"),
         ("B2B companies", "Product walkthroughs, onboarding videos and update messages.", "spokes-use-b2b", "A presenter next to a software screenshot with an onboarding checklist"),
         ("Colleges and education brands", "Welcome messages, course overviews and admissions updates.", "spokes-use-edu", "A presenter in front of a campus banner reading Admissions Open")],
    faqs=[("Is the presenter a real person?", "The presenters are AI-generated. If you want a specific real person, that needs their written approval and their footage."),
          ("Which languages are available?", "A range of Indian and international languages. We confirm your list when we scope the work."),
          ("How do you handle lip movement and voice?", "Voice and lip movement are generated together and reviewed by an editor before delivery."),
          ("Can we change the script later?", "Yes. Update the script and we regenerate the affected parts."),
          ("Can videos be used in ads and on the site?", "Yes. We deliver the formats each channel needs.")],
)

def _ic(paths):
    return f'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">{paths}</svg>'

ICONS = {
    "camera": _ic('<path d="M4 8h3l1.5-2h7L17 8h3a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1Z"/><circle cx="12" cy="13.5" r="3.5"/>'),
    "film": _ic('<rect x="3" y="5" width="18" height="14" rx="1.5"/><path d="M3 9h4M3 15h4M17 9h4M17 15h4M9 5v14M15 5v14"/>'),
    "chat": _ic('<path d="M4 5.5h16a1 1 0 0 1 1 1V15a1 1 0 0 1-1 1H9l-4 4v-4H4a1 1 0 0 1-1-1V6.5a1 1 0 0 1 1-1Z"/><path d="M7 9.5h10M7 12.5h6"/>'),
    "phone": _ic('<rect x="7" y="2.5" width="10" height="19" rx="2"/><path d="M11 19h2"/>'),
    "page": _ic('<rect x="3.5" y="4" width="17" height="16" rx="1.5"/><path d="M3.5 8.5h17M7 12h3M7 15h6"/>'),
    "mic": _ic('<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M6 11a6 6 0 0 0 12 0M12 17v4M9 21h6"/>'),
}

# Extra blocks that power the scroll-driven scenes
GRID_BRIEFS = [
    "The skincare bottle on a marble bathroom shelf", "The bottle on a wooden picnic table outdoors", "The bottle held in a hand against yellow",
    "The bottle beside a cup of tea on a windowsill", "The bottle in a gym bag pocket", "The bottle on a hotel bed tray",
    "The bottle on a festival diya table", "The bottle in a travel pouch on a suitcase", "The bottle on a vanity with a mirror",
    "The bottle next to fresh flowers", "The bottle on a beach towel", "The bottle in a gift box with ribbon",
    "The bottle on a rainy window ledge", "The bottle on a studio pedestal with soft shadow"]
SCRUB_BRIEFS = [
    "Full landing page for a D2C skincare offer: hero, product grid, reviews, buy button",
    "Full landing page for a college course intake: fees, eligibility, apply button",
    "Full landing page for a B2B software demo: proof logos, features, demo form",
    "Full landing page for a festival sale: countdown, offer tiles, checkout button",
    "Full landing page for a webinar signup: speaker photos, agenda, short form"]
SLIDES = [
    ("video-show-1", "A vertical toothpaste ad frame: tiny cartoon workers scrubbing a giant tooth"),
    ("video-show-2", "A 3D-rendered kitchen with a slow push-in on a glowing appliance"),
    ("video-show-3", "A cartoon mascot waving beside a colourful brand storefront"),
    ("video-show-4", "A sneaker floating through a bright paper-cut city, product close-up")]
CENTER_HERO = {"ai-photoshoot"}
REV_HERO = {"ai-ugc", "ai-spokesperson-video"}

def head_html(title, desc, slug, extra_schema=""):
    url = f"{SITE}/{slug}.html" if slug != "index" else f"{SITE}/ai.html"
    return f'''<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>{e(title)}</title><meta name="description" content="{e(desc)}"><link rel="canonical" href="{url}">
<meta property="og:title" content="{e(title)}"><meta property="og:description" content="{e(desc)}"><meta property="og:type" content="website">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&family=Raleway:ital,wght@0,700;0,800;1,600;1,700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="assets/ai.css">
{extra_schema}</head><body>'''

def nav():
    return '''<header class="nav"><a class="nav__logo" href="index.html">M<b>M</b>C</a><nav class="nav__links" aria-label="Main">
<a href="#">Services</a><a href="#">Our Work</a><a href="#">About</a><a href="#">Contact</a>
<a class="pill" href="index.html" aria-label="AI by MMC">AI by MMC</a></nav></header>'''

def footer():
    return ('<footer class="foot"><div class="wrap"><span>\u00a9 2026 Monday Marketing Company</span><span>AI by MMC (standalone build, to be merged into the MMC site)</span></div></footer>'
            '<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js"></script>'
            '<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js"></script>'
            '<script src="https://cdn.jsdelivr.net/npm/lenis@1.1.13/dist/lenis.min.js"></script>'
            '<script src="assets/ai-motion.js"></script><script src="assets/ai.js"></script></body></html>')

def answer_block(text):
    return ('<section class="band band--paper"><div class="wrap"><div class="answer rise">'
            '<i class="answer__ico" aria-hidden="true">' + _ic('<path d="M4 5.5h16a1 1 0 0 1 1 1V15a1 1 0 0 1-1 1H9l-4 4v-4H4a1 1 0 0 1-1-1V6.5a1 1 0 0 1 1-1Z"/><path d="M8 9.8h8M8 12.6h5"/>') + '</i>'
            '<div class="answer__body"><span class="answer__tag">The short answer</span>'
            f'<p class="answer__text" data-split>{e(text)}</p>'
            '<div class="answer__foot"><span>Plain language</span><span>One paragraph</span><span>Ready for AI answer engines</span></div>'
            '</div></div></div></section>')

def faq_html(faqs):
    items = "".join(
        f'<div class="faq__i"><button class="faq__q" type="button" aria-expanded="false"><span>{e(q)}</span><i aria-hidden="true"></i></button>'
        f'<div class="faq__a"><div><p>{e(a)}</p></div></div></div>' for q, a in faqs)
    return f'<div class="faq rise"><div class="faq__glow" aria-hidden="true"></div>{items}</div>'

def schema(title, desc, slug, faqs, name):
    url = f"{SITE}/{slug}.html"
    data = [
        {"@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [
            {"@type": "ListItem", "position": 1, "name": "Home", "item": SITE + "/"},
            {"@type": "ListItem", "position": 2, "name": "AI by MMC", "item": SITE + "/ai.html"},
            {"@type": "ListItem", "position": 3, "name": name, "item": url}]},
        {"@context": "https://schema.org", "@type": "Service", "name": name, "description": desc, "url": url,
         "provider": {"@type": "Organization", "name": "Monday Marketing Company", "url": SITE}},
        {"@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [
            {"@type": "Question", "name": q, "acceptedAnswer": {"@type": "Answer", "text": a}} for q, a in faqs]},
    ]
    return "".join(f'<script type="application/ld+json">{json.dumps(d, ensure_ascii=False)}</script>' for d in data)

def related(cur):
    return '<div class="related">' + "".join(f'<a href="{s["slug"]}.html"><i class="related__ico" aria-hidden="true">{ICONS[s["ico"]]}</i>{e(s["name"])}</a>' for s in SERVICES if s["slug"] != cur) + "</div>"

def cta(h, sub):
    return f'''<section class="band band--sunsoft" id="talk"><div class="wrap"><div class="cta rise"><span class="eyebrow">Start with a conversation</span>
<h2 data-split>{h}</h2><p class="lede">{sub}</p><div class="hero__act"><a class="btn btn--sun" href="#" data-magnet>Book a call <i class="arr"></i></a><a class="btn btn--ghost" href="index.html">See all AI by MMC</a></div></div></div></section>'''

def fan(slots_html):
    cards = "".join(f'<div class="fan__c">{s}</div>' for s in slots_html)
    return f'<div class="fan" data-fan>{cards}</div>'

def hero_slots(slug):
    key, base = PAGES[slug]["hero"]
    base = list(base)
    while len(base) < 5:
        n, b, t = base[len(base) % 3]
        base.append((f"{key}-hero-{len(base) + 1}", b + ", from a different angle", t))
    kind = "v" if slug in ("ai-ugc", "ai-spokesperson-video", "ai-video-generation") else "sq"
    out = []
    for n, b, _ in base[:5]:
        out.append(vslot(n, b, "Hero loop") if kind == "v" else slot(n, b, kind))
    return out

def service_page(slug):
    p = PAGES[slug]; svc = next(s for s in SERVICES if s["slug"] == slug)
    key = p["hero"][0]
    layout = "hero--center" if slug in CENTER_HERO else ("hero--rev" if slug in REV_HERO else "")
    steps_cls = "steps steps--sales" if slug == "ai-sales-agent" else "steps"
    steps = "".join(f'<li class="rise">{slot(im, br, "w")}<h3>{e(t)}</h3><p>{e(d)}</p></li>' for t, d, im, br in p["steps"])
    gets = "".join(f'<article class="card rise">{slot(im, br, "w")}<h3>{e(t)}</h3><p>{e(d)}</p></article>'
                   for (t, d), im, br in zip(p["gets"], p["gets_imgs"], p["gets_briefs"]))
    use = "".join(f'<article class="rise">{slot(im, br, "w")}<div><h3>{e(t)}</h3><p>{e(d)}</p></div></article>' for t, d, im, br in p["use"])
    text = (f'<div class="hero__txt"><span class="badge">AI by MMC</span><h1 data-words>{e(p["h1"])}</h1><p class="lede">{e(p["sub"])}</p>'
            '<div class="hero__act"><a class="btn btn--sun" href="#talk" data-magnet>Book a call <i class="arr"></i></a><a class="btn btn--ghost" href="#how">See how it works</a></div></div>')
    fan_html = fan(hero_slots(slug))
    hero_inner = (fan_html + text) if slug in CENTER_HERO else (text + fan_html if slug not in REV_HERO else fan_html + text)
    extras_before_how = ""
    extras_after_gets = ""
    if slug == "ai-photoshoot":
        tiles = "".join(f'<div class="pin__t">{slot("photoshoot-grid-%d" % (i + 1), b, "sq")}</div>' for i, b in enumerate(GRID_BRIEFS))
        base_t = f'<div class="pin__base">{slot("photoshoot-base", "The one real base photo: the DEWLEAF Watermelon Glow Serum bottle and box on a plain white table, flat daylight", "sq", "Base image")}</div>'
        cells = "".join(tiles.split("</div></div>")[:7]) + "</div></div>"
        parts = [f'<div class="pin__t">{slot("photoshoot-grid-%d" % (i + 1), b, "sq")}</div>' for i, b in enumerate(GRID_BRIEFS)]
        grid = "".join(parts[:7]) + base_t + "".join(parts[7:])
        extras_before_how = ('<section class="band band--void pin" id="scenes"><div class="pin__sticky"><div class="wrap"><div class="head head--c pin__head">'
                             '<span class="eyebrow">One base image</span><h2 data-split>Fourteen scenes from <span class="serif">one photo.</span></h2></div>'
                             f'<div class="pin__grid">{grid}</div></div></div></section>')
    if slug == "ai-sales-agent":
        story_txt = "".join(f'<div class="story__t"><span class="eyebrow">Step {i + 1}</span><h3>{e(t)}</h3><p>{e(d)}</p></div>' for i, (t, d, im, br) in enumerate(p["steps"][:3]))
        plates = "".join(f'<div class="plate">{slot(im, br, "w")}</div>' for t, d, im, br in p["steps"][:3])
        extras_before_how = ('<section class="band band--void story" id="story"><div class="story__sticky"><div class="wrap story__grid">'
                             f'<div class="story__text">{story_txt}</div><div class="story__plates">{plates}</div></div></div></section>')
    if slug == "ai-ugc":
        poster = vslot("ugc-hero-1", "A woman applying the DEWLEAF serum in a bright bathroom, talking to camera", "Single sample clip, looping").replace('data-video=""', 'data-video="assets/video/ugc-sample.mp4"', 1).replace('<span class="slot__tag">Video later</span>', '<span class="slot__tag slot__tag--on">Sample clip</span>', 1)
        extras_before_how = ('<section class="band band--blue50 clipband" id="sample" data-mgfx="wave"><div class="wrap clip"><div class="clip__txt rise"><span class="eyebrow">See one in motion</span>'
                             '<h2 data-split>One script. One creator. <span class="serif">One clip.</span></h2>'
                             '<p class="lede">A sample made for an example beauty brand. Yours is briefed around your product, your claims and your language, then tested in your ad account.</p>'
                             '<ul class="clip__chips"><li>Script</li><li>AI creator</li><li>Captions</li><li>Ad-ready</li></ul></div>'
                             f'<div class="clip__phone rise"><div class="phone">{poster}</div></div></div></section>')
    if slug == "ai-spokesperson-video":
        poster = vslot("spokes-hero-1", "An Indian woman presenter in a blue blazer speaking to camera in a bright studio", "Single sample clip, looping").replace('data-video=""', 'data-video="assets/video/spokes-sample.mp4"', 1).replace('<span class="slot__tag">Video later</span>', '<span class="slot__tag slot__tag--on">Sample clip</span>', 1)
        extras_before_how = ('<section class="band band--blue50 clipband" id="sample" data-mgfx="wave"><div class="wrap clip"><div class="clip__txt rise"><span class="eyebrow">See one in motion</span>'
                             '<h2 data-split>One script. One presenter. <span class="serif">One clip.</span></h2>'
                             '<p class="lede">A sample from an on-file presenter. Yours is briefed to your script, your brand and your languages, then delivered ready for every channel.</p>'
                             '<ul class="clip__chips"><li>Script</li><li>AI presenter</li><li>Captions</li><li>Multi-language</li></ul></div>'
                             f'<div class="clip__phone rise"><div class="phone">{poster}</div></div></div></section>')
    integ = ""
    if p.get("integrations"):
        chips = "".join(f'<span class="flow__n" data-i="{i}">{e(x)}</span>' for i, x in enumerate(p["integrations"]))
        integ = ('<section class="band band--ink"><div class="wrap"><div class="head head--c"><span class="eyebrow">Connects to your stack</span><h2 data-split>Works with the tools <span class="serif">you already use.</span></h2>'
                 '<p class="lede">The exact list is confirmed when we scope the work. Live build: replace names with official logos.</p></div>'
                 f'<div class="flow" data-flow><div class="flow__hub"><b>MMC</b><span>AI agent</span></div>{chips}</div></div></section>')
    marq = ""
    if slug in ("ai-ugc", "ai-spokesperson-video"):
        def reel_cell(i):
            name = f"{key}-reel-{i}"
            brief = f"Vertical clip frame {i}: {p['hero'][1][i % 3][1]}"
            cell = vslot(name, brief, "Loop clip")
            if i <= 4:
                cell = cell.replace('data-video=""', f'data-video="assets/video/{name}.mp4"', 1).replace('<span class="slot__tag">Loop clip</span>', '<span class="slot__tag slot__tag--on">Loop</span>', 1)
            return cell
        cells = "".join(reel_cell(i) for i in range(1, 7))
        marq = f'<section class="band band--white" data-mgfx="blobs"><div class="wrap"><div class="head head--c"><span class="eyebrow">Look and feel</span><h2 data-split>The kind of clip we <span class="serif">produce.</span></h2></div></div><div class="marq"><div class="marq__row">{cells}{cells}</div></div></section>'
    if slug == "ai-video-generation":
        SHOW_VIDEO = {"video-show-1": "video-show-1.mp4", "video-show-2": "video-show-2.mp4", "video-show-3": "video-show-3.mp4"}
        def show_cell(n, b):
            s2 = vslot(n, b, "Ad film loop")
            if n in SHOW_VIDEO:
                s2 = s2.replace('data-video=""', f'data-video="assets/video/{SHOW_VIDEO[n]}"', 1).replace('<span class="slot__tag">Ad film loop</span>', '<span class="slot__tag slot__tag--on">Loop</span>', 1)
            return f'<div class="ss__s">{s2}</div>'
        sl = "".join(show_cell(n, b) for n, b in SLIDES)
        extras_after_gets = ('<section class="band band--void"><div class="wrap"><div class="head head--c"><span class="eyebrow">Sample films</span><h2 data-split>Drag through the <span class="serif">reel.</span></h2></div>'
                             f'<div class="ss" data-ss><div class="ss__track">{sl}</div><div class="ss__ctl"><button class="ss__b" data-prev aria-label="Previous">\u2039</button>'
                             '<button class="ss__p" data-pause aria-pressed="false"><i></i>Pause</button><button class="ss__b" data-next aria-label="Next">\u203a</button></div></div></div></section>')
    if slug == "ai-landing-page-builder":
        frames = "".join(f'<div class="bframe__p">{slot("lp-scrub-%d" % (i + 1), b, "w")}</div>' for i, b in enumerate(SCRUB_BRIEFS))
        extras_after_gets = ('<section class="band band--void scrub" id="scrub"><div class="scrub__sticky"><div class="wrap"><div class="head head--c"><span class="eyebrow">The edge</span><h2 data-split>Pages that fit every <span class="serif">campaign.</span></h2></div>'
                             '<div class="bframe"><div class="bframe__bar"><i></i><i></i><i></i><span>yourbrand.com/offer</span></div>'
                             f'<div class="bframe__v">{frames}</div></div></div></div></section>')
    return (head_html(p["title"], p["desc"], slug, schema(p["title"], p["desc"], slug, p["faqs"], svc["name"])) + nav() + f'''
<main>
<section class="band hero hero--light {layout}"><canvas class="stars" data-theme="light" aria-hidden="true"></canvas><i class="hero__fade" aria-hidden="true"></i><div class="wrap hero__grid">{hero_inner}</div></section>
{answer_block(p["answer"])}
{extras_before_how}
<section class="band band--blue50" id="how"><div class="wrap"><div class="head"><span class="eyebrow">How it works</span><h2 data-split>Four steps from brief to <span class="serif">live.</span></h2></div><ol class="{steps_cls}">{steps}</ol></div></section>
<section class="band band--white"><div class="wrap"><div class="head"><span class="eyebrow">What you get</span><h2 data-split>Built to be used, not just <span class="serif">admired.</span></h2></div><div class="cards">{gets}</div></div></section>
{extras_after_gets}
{marq}
<section class="band"><div class="wrap"><div class="head"><span class="eyebrow">Who it is for</span><h2 data-split>The same service, three <span class="serif">audiences.</span></h2></div><div class="aud">{use}</div></div></section>
{integ}
<section class="band band--white"><div class="wrap"><div class="head"><span class="eyebrow">Common questions</span><h2 data-split>Before you <span class="serif">ask.</span></h2></div>{faq_html(p["faqs"])}</div></section>
<section class="band"><div class="wrap"><div class="head"><span class="eyebrow">More from AI by MMC</span><h2 data-split>Five other ways to put AI <span class="serif">to work.</span></h2></div>{related(slug)}</div></section>
{cta("Ready to try " + e(svc["name"]) + "?", "Tell us what you sell and who you sell to. We will say where this service fits and where it does not.")}
</main>''' + footer())

HUB_BRIEFS = {
    "ai-photoshoot": "A perfume bottle shown in four different scenes in a 2 by 2 grid",
    "ai-video-generation": "A film strip of six frames from one product ad",
    "ai-sales-agent": "A chat window open on a phone with a friendly reply",
    "ai-ugc": "A vertical creator-style clip of a person holding a product",
    "ai-landing-page-builder": "Three landing page layouts side by side",
    "ai-spokesperson-video": "A presenter speaking to camera with captions",
}

def hub():
    title = "AI by MMC: AI Services for Growth Teams | Monday Marketing Company"
    desc = "Six AI services from MMC: photoshoots, video, sales agents, UGC, landing pages and spokesperson videos, tied to performance marketing for D2C, B2B and education."
    faqs = [("What is AI by MMC?", "It is MMC's set of AI-powered services: AI photoshoot, AI video generation, AI sales agent, AI UGC, AI landing page builder and AI spokesperson video. Each is run by our team and connected to performance marketing."),
            ("Who is it for?", "D2C brands, B2B companies and colleges and education brands."),
            ("Do we need to use all six?", "No. Start with the one that removes your biggest bottleneck. Many teams begin with images or landing pages."),
            ("How is this different from an AI tool?", "A tool gives you software. We give you finished work, reviewed by people, and we measure it in your ad account."),
            ("What does it cost?", "It depends on scope, so we quote after a short call.")]
    def svc_item(i, s):
        return (f'<button class="svcx__item{" is-active" if i == 0 else ""}" data-idx="{i}" type="button" aria-pressed="{"true" if i == 0 else "false"}">'
                f'<span class="svcx__bar" aria-hidden="true"><i></i></span>'
                f'<span class="svcx__n">{i + 1:02d}</span>'
                f'<i class="svcx__ico" aria-hidden="true">{ICONS[s["ico"]]}</i>'
                f'<span class="svcx__txt"><b>{e(s["name"])}</b><span>{e(s["short"])}</span></span>'
                f'<i class="svcx__arr" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6"/></svg></i></button>')
    def svc_frame(i, s):
        img = slot("hub-" + s["slug"].replace("ai-", ""), HUB_BRIEFS[s["slug"]], "w")
        return f'<a class="svcx__frame{" is-active" if i == 0 else ""}" href="{s["slug"]}.html" data-idx="{i}" tabindex="{"0" if i == 0 else "-1"}">{img}<span class="svcx__cta">Explore {e(s["name"])}<i class="arr"></i></span></a>'
    svc_list = "".join(svc_item(i, s) for i, s in enumerate(SERVICES))
    svc_frames = "".join(svc_frame(i, s) for i, s in enumerate(SERVICES))
    cards = f'<div class="svcx__list">{svc_list}</div><div class="svcx__stage">{svc_frames}</div>'
    loop = [("Brief", "hub-loop-1", "A strategist and a designer at one desk with a shared brief on a monitor"),
            ("Generate", "hub-loop-2", "A screen showing generated image and video variants in a grid"),
            ("Refine", "hub-loop-3", "An editor correcting a generated frame with a stylus"),
            ("Ship", "hub-loop-4", "Creative going into an ad account with named variants"),
            ("Measure", "hub-loop-5", "A dashboard with cost per lead and winner variants")]
    loop_html = "".join(f'<li class="rise">{slot(im, br, "w")}<h3>{t}</h3><p>{d}</p></li>' for (t, im, br), d in zip(loop, [
        "We agree the goal, audience and offer.", "AI produces the options.", "People correct and approve.", "Work goes live in the right format.", "Results feed the next round."]))
    aud = [("D2C brands", "Images, films and pages for every launch and season.", "hub-aud-d2c", "A packed courier parcel and a phone showing the product page"),
           ("B2B companies", "Sales agents, explainers and demo pages that fill the pipeline.", "hub-aud-b2b", "A team in a meeting room looking at a product demo on a wall screen"),
           ("Colleges and education brands", "Admissions creative and instant answers for parents.", "hub-aud-edu", "A counsellor talking to a parent and student across a desk")]
    aud_html = "".join(f'<article class="rise">{slot(im, br, "w")}<div><h3>{e(t)}</h3><p>{e(d)}</p></div></article>' for t, d, im, br in aud)
    tools = [("openai.svg", "ChatGPT"), ("anthropic.svg", "Claude"), ("midjourney.png", "Midjourney"), ("runway.png", "Runway"),
             ("google.svg", "Veo"), ("heygen.svg", "HeyGen"), ("elevenlabs.svg", "ElevenLabs"), ("figma.svg", "Figma"),
             ("framer.svg", "Framer"), ("n8n.svg", "n8n")]
    tool_row = "".join(f'<span class="tool"><img src="assets/tools/{f}" alt="{e(x)}" loading="lazy" decoding="async"><span>{e(x)}</span></span>' for f, x in tools)
    sc = json.dumps({"@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [
        {"@type": "Question", "name": q, "acceptedAnswer": {"@type": "Answer", "text": a}} for q, a in faqs]}, ensure_ascii=False)
    bc = json.dumps({"@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [
        {"@type": "ListItem", "position": 1, "name": "Home", "item": SITE + "/"},
        {"@type": "ListItem", "position": 2, "name": "AI by MMC", "item": SITE + "/ai.html"}]})
    sch = f'<script type="application/ld+json">{sc}</script><script type="application/ld+json">{bc}</script>'
    return (head_html(title, desc, "index", sch) + nav() + f'''
<main>
<section class="band hero hero--hub hero--light"><canvas class="stars" data-theme="light" aria-hidden="true"></canvas><i class="hero__fade" aria-hidden="true"></i><div class="wrap hero__center">
<span class="badge badge--split"><b>Grow with AI</b><i>Made by machines. Checked by people.</i></span>
<p class="lede hero__pre">From assistants to automations, MMC puts AI to work on the images, films, pages and conversations behind your growth.</p>
<h1 data-words>Let AI do the heavy lifting. <span class="grad">We make sure it grows you.</span></h1>
<div class="hero__act"><a class="btn btn--sun" href="#services" data-magnet>See the six services <i class="arr"></i></a><a class="btn btn--ghost" href="#talk">Book a call</a></div>
<p class="hero__tools">A few of the tools we work with.</p></div>
<div class="tools marq"><div class="marq__row marq__row--tools">{tool_row}{tool_row}</div></div></section>
{answer_block("AI by MMC is a set of six AI services from Monday Marketing Company: photoshoots, video, sales agents, UGC, landing pages and spokesperson videos. Our team runs each one, checks the work, and connects it to performance marketing so it is measured on real results.")}
<section class="band" id="services"><div class="wrap"><div class="head"><span class="eyebrow">The six services</span><h2 data-split>Pick the bottleneck. <span class="serif">We remove it.</span></h2></div><div class="svcx" data-svcx>{cards}</div></div></section>
<section class="band band--ink"><div class="wrap"><div class="head"><span class="eyebrow">How we work</span><h2 data-split>AI makes it. People check it. <span class="serif">Numbers decide.</span></h2><p class="lede">Every AI service runs on the same loop, which is what separates finished work from a tool subscription.</p></div><ol class="steps">{loop_html}</ol></div></section>
<section class="band"><div class="wrap"><div class="head"><span class="eyebrow">Three ways in</span><h2 data-split>Built for the brands <span class="serif">we work with.</span></h2></div><div class="aud">{aud_html}</div></div></section>
<section class="band band--white"><div class="wrap"><div class="head"><span class="eyebrow">Common questions</span><h2 data-split>What teams ask <span class="serif">first.</span></h2></div>{faq_html(faqs)}</div></section>
{cta("Find where AI saves you the most time.", "Tell us what slows your team down. We will say which of the six fits, and which does not.")}
</main>''' + footer())

if __name__ == "__main__":
    pages = {"index.html": hub()}
    for s in SERVICES:
        pages[s["slug"] + ".html"] = service_page(s["slug"])
    for name, body in pages.items():
        assert "\u2014" not in body, name + " contains an em dash"
        open(os.path.join(ROOT, name), "w").write(body)
    print("wrote", ", ".join(pages))
