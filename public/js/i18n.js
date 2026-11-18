(function () {
  'use strict';

  var STORAGE_KEY = 'portfolioLang';

  var dict = {
    fr: {
      'meta.title': 'Eliot Giraud | Développeur web full-stack | Annecy',
      'meta.description':
        'Eliot Giraud, développeur web full-stack à Annecy. MBA My Digital School, alternance Darewell (kanam.io, probante.fr), projet SAFACT, e-commerce Vinatis.',
      'skip': 'Aller au contenu',
      'nav.label': 'Navigation principale',
      'nav.homeAria': 'Eliot Giraud, accueil',
      'nav.home': 'Accueil',
      'nav.about': 'À propos',
      'nav.experience': 'Expériences',
      'nav.skills': 'Compétences',
      'nav.ai': 'IA',
      'nav.projects': 'Projets',
      'nav.contact': 'Contact',
      'nav.open': 'Ouvrir le menu',
      'nav.close': 'Fermer le menu',
      'lang.label': 'Langue',
      'hero.kicker': 'Développeur web full-stack',
      'hero.tagline': 'MBA My Digital School · Alternance Darewell · Annecy',
      'hero.cta.projects': 'Voir les projets',
      'hero.cta.cv': 'CV PDF',
      'hero.scroll': 'Aller à la section À propos',
      'hero.portraitAlt': "Portrait d'Eliot Giraud",
      'aria.newTab': '(nouvel onglet)',
      'aria.linkedin': 'LinkedIn (nouvel onglet)',
      'aria.github': 'GitHub (nouvel onglet)',
      'aria.cv': 'Télécharger le CV en PDF (nouvel onglet)',
      'about.title': 'Qui suis-je ?',
      'about.p1':
        'J\'ai <strong class="accent">24 ans</strong> et je suis en deuxième année de MBA développement full-stack à <strong class="accent">My Digital School</strong>. En alternance chez <strong class="accent">Darewell</strong>, j\'interviens sur <strong class="accent">kanam.io</strong> (SIRH) et <strong class="accent">probante.fr</strong> (organismes de formation), de l\'interface à l\'API. Auparavant, j\'ai effectué une année d\'alternance en bachelor chez <strong class="accent">Vinatis</strong> (2024-2025) sur l\'e-commerce (Vue, Nuxt).',
      'about.p2':
        'Curieux et rigoureux, j\'aime livrer du code lisible, maintenable et aligné sur les besoins métiers, que ce soit sur un site grand public ou un outil interne.',
      'about.aside': 'En dehors du code',
      'about.music':
        'La <strong>musique</strong> occupe une vraie place dans mon quotidien. J\'ai acheté <strong>FL Studio</strong> et je commence à créer mes propres sons, en explorant la prod petit à petit. Le <strong>diabolo</strong> m\'aide à rester concentré, et le <strong>snowboard</strong> l\'hiver pour couper du clavier et me challenger autrement.',
      'about.diaboloAlt': 'Eliot pratiquant le diabolo',
      'about.snowAlt': 'Eliot en snowboard',
      'exp.title': 'Expériences',
      'exp.intro': 'Alternance en cours chez Darewell, après une année e-commerce en bachelor chez Vinatis.',
      'exp.role': 'Alternant développeur web',
      'exp.darewell.meta': 'MBA My Digital School · 2025 – 2027',
      'exp.darewell.li1':
        '<a href="https://kanam.io/" target="_blank" rel="noopener noreferrer">kanam.io <span class="visually-hidden">(nouvel onglet)</span></a> : SIRH (collaborateurs, congés, entretiens, compétences).',
      'exp.darewell.li2':
        '<a href="https://probante.fr/" target="_blank" rel="noopener noreferrer">probante.fr <span class="visually-hidden">(nouvel onglet)</span></a> : logiciel pour organismes de formation (inscriptions, émargement, facturation).',
      'exp.darewell.li3':
        'Travail en équipe sur deux bases existantes : interfaces, parcours métiers, qualité et besoins clients.',
      'exp.darewell.stack': 'Stack : React, Node.js, Bootstrap, NoSQL',
      'exp.vinatis.meta': 'Bachelor My Digital School · 2024 – 2025',
      'exp.vinatis.li1': 'Site e-commerce, back-office et outils métiers (commandes, inventaires).',
      'exp.vinatis.li2':
        'Montée en compétences fortes sur <strong>Vue.js</strong>, <strong>Nuxt</strong>, écosystème front moderne.',
      'exp.vinatis.li3':
        'Symfony, Docker, PrestaShop : intégration et maintenance en conditions réelles.',
      'exp.vinatis.stack': 'Stack : Vue, Nuxt, Symfony, Docker, PrestaShop',
      'skills.title': 'Compétences',
      'skills.intro':
        'Du composant UI à la persistance des données&nbsp;: stacks JavaScript modernes et bases PHP/Symfony.',
      'skills.replay': 'Relancer l’animation',
      'skills.replayAria': 'Relancer l’animation des compétences',
      'skills.front': 'Front-end',
      'skills.back': 'Back-end &amp; données',
      'skills.tools': 'Outils &amp; plateformes',
      'ia.kicker': 'Méthode',
      'ia.title': 'Mon rapport à l’IA',
      'ia.lead':
        'Pour moi, l’IA c’est un peu comme la calculatrice à l’époque. Tout le monde en a peur, certains veulent l’interdire, et au final c’est juste un outil de plus qui aide au quotidien et au travail. Pas une baguette magique, juste un levier. J’essaie régulièrement un peu toutes les IA selon mon besoin, pour voir laquelle est la plus efficace.',
      'ia.h1': 'Accélérer sans lâcher le volant',
      'ia.p1':
        'Au quotidien je développe dans <strong class="accent">Cursor</strong>. Je m’en sers pour explorer une API, débloquer un bug, ou préparer une première version de tests et de doc. Ensuite je relis, je tranche et je corrige. Le code qui part en prod reste le mien.',
      'ia.h2': 'Apprendre en boucle courte',
      'ia.p2':
        'Quand je découvre un concept, une stack ou un outil, je demande des explications ciblées. Je reformule l’idée avec mes mots, puis je la valide sur un vrai besoin.',
      'ia.h3': 'Gagner du temps là où ça compte',
      'ia.p3':
        'Pour la rédaction, la préparation d’entretiens ou la structuration d’une feature, je laisse l’outil poser un premier brouillon. Comme ça, je peux concentrer mon énergie sur le produit, le métier et la qualité.',
      'projects.title': 'Projets',
      'projects.intro':
        'Des preuves concrètes&nbsp;: client réel, produits full-stack, et quelques travaux plus courts.',
      'marquee.label': "Bandeau d'aperçus des projets",
      'marquee.help':
        'Les aperçus défilent automatiquement. Cliquez et glissez pour faire défiler plus vite.',
      'marquee.enlarge': 'Agrandir',
      'lightbox.label': 'Aperçu agrandi',
      'lightbox.close': "Fermer l'aperçu",
      'tag.client': 'Client',
      'tag.fullstack': 'Full-stack',
      'tag.hosting': 'Hébergement',
      'tag.docs': 'Documentation',
      'tag.desktop': 'Desktop',
      'tag.spotify': 'Spotify',
      'tag.music': 'Musique',
      'tag.media': 'Médias',
      'tag.vps': 'VPS',
      'tag.webapp': 'Web app',
      'tag.roles': 'Rôles',
      'tag.showcase': 'Site vitrine',
      'tag.api': 'API',
      'tag.game': 'Jeu',
      'link.viewApp': "Voir l'app",
      'link.viewSite': 'Voir le site',
      'link.viewDemo': 'Voir la démo',
      'link.github': 'Code sur GitHub',
      'thumb.safact': 'Application SAFACT (nouvel onglet)',
      'thumb.bass': 'Site BassOrder (nouvel onglet)',
      'thumb.smeggMusic': 'SMEGG, partage musical',
      'thumb.grosmino': "Dépôt Grosmino's",
      'thumb.gaudi': 'Démo Musée Gaudi',
      'thumb.granny': 'Granny Smith Annecy',
      'thumb.eco': 'Dépôt ECOMOBIL sur GitHub',
      'thumb.morpion': 'Dépôt Morpion sur GitHub',
      'alt.safact': "Aperçu de l'application métier SAFACT",
      'alt.bass': 'Aperçu BassOrder, app de tri musical',
      'alt.smeggMusic': 'SMEGG, intégration musique (Spotify, Deezer, etc.)',
      'alt.grosmino': "Aperçu Grosmino's, app de commande de repas",
      'alt.gaudi': 'Aperçu du site musée Gaudi',
      'alt.granny': 'Aperçu du site Granny Smith',
      'alt.eco': 'Aperçu ECOMOBIL',
      'alt.morpion': 'Aperçu du jeu Morpion',
      'safact.title': 'SAFACT, gestion foncière',
      'safact.year': '2026',
      'safact.body':
        'Projet personnel pour un client&nbsp;: application métier interne de suivi des actes et procédures foncières (communes, dossiers, pièces, modèles Word/PDF, relances, rapports). Gros chantier sur plusieurs mois, mené de A à Z jusqu\'à la mise en prod et la documentation. En ligne sur <a href="https://app.safact.fr/" target="_blank" rel="noopener noreferrer">app.safact.fr <span class="visually-hidden">(nouvel onglet)</span></a>.',
      'safact.stack': 'Stack : Nuxt · Vue · TypeScript · Tailwind · Prisma · PostgreSQL · Docker',
      'bass.title': 'BassOrder, tri musical',
      'bass.year': '2026',
      'bass.body':
        'App desktop Windows (macOS en route) pour ranger une bibliothèque chaotique : playlists / likes Spotify et dossiers locaux, suggestions de genres, puis copie ou déplacement vers Rock, Jazz, Hip-Hop, Electro, etc. Site et téléchargement sur <a href="https://bassorder.smegg.cloud/" target="_blank" rel="noopener noreferrer">bassorder.smegg.cloud <span class="visually-hidden">(nouvel onglet)</span></a>.',
      'bass.stack': 'Stack : Tauri · React · TypeScript · Rust · Vite',
      'smegg.title': 'SMEGG, réseau social',
      'smegg.year': '2026',
      'smegg.body':
        'Application web pensée avec deux amis pour garder le lien : publications photo et vidéo, groupes, messagerie privée, et musique au centre (aperçus Spotify, Deezer, SoundCloud, YouTube). Hébergement VPS perso&nbsp;: app, API et base.',
      'smegg.stack': 'Stack : Nuxt · Vue · Tailwind · MySQL · PWA',
      'grosmino.title': "Grosmino's, livraison de repas",
      'grosmino.year': '2025',
      'grosmino.body':
        'Projet façon Uber&nbsp;Eats : espace restaurateur, parcours client et back-office administrateur pour piloter la plateforme (rôles séparés).',
      'grosmino.stack': 'Stack : Nuxt · Vue · TypeScript · Tailwind CSS',
      'gaudi.title': 'Musée Gaudi',
      'gaudi.year': '2024',
      'gaudi.body': "Site vitrine pour un musée : parcours et présentation de l'œuvre de Gaudi.",
      'gaudi.stack': 'Stack : HTML · CSS',
      'granny.title': 'Granny Smith',
      'granny.year': '2024',
      'granny.body': 'Site vitrine pour un restaurant à Annecy.',
      'granny.stack': 'Stack : HTML · CSS · JavaScript',
      'eco.title': 'ECOMOBIL',
      'eco.year': '2024',
      'eco.body': 'Réservation de véhicules (trottinettes, vélos…). Démo non hébergée.',
      'eco.stack': 'Stack : PHP · HTML · CSS · MySQL',
      'morpion.title': 'Morpion 1v1',
      'morpion.year': '2024',
      'morpion.body': 'Jeu interactif en local avec interface graphique.',
      'morpion.stack': 'Stack : Python · Tkinter',
      'cap.safact.home': 'SAFACT · Accueil',
      'cap.safact.clients': 'SAFACT · Clients',
      'cap.safact.files': 'SAFACT · Dossiers',
      'cap.safact.lib': 'SAFACT · Bibliothèque',
      'cap.safact.reports': 'SAFACT · Rapports',
      'cap.smegg.music': 'SMEGG · Musique',
      'cap.gaudi': 'Musée Gaudi',
      'contact.title': 'Contact',
      'contact.lead':
        'Pour un projet, un poste à plein temps ou simplement échanger : écrivez-moi, je réponds rapidement.',
      'footer.legal': 'Informations légales',
      'footer.mentions': 'Mentions légales',
      'footer.privacy': 'Confidentialité',
      'footer.a11y': 'Accessibilité',
      'footer.credit': 'Site créé par <a href="index.html">Eliot Giraud</a> · © 2026',
      'legal.back': 'Retour à l’accueil',
      'legal.mentions.title': 'Mentions légales',
      'legal.mentions.docTitle': 'Mentions légales · Eliot Giraud',
      'legal.mentions.lead':
        'Informations prévues par la loi pour la confiance dans l’économie numérique (LCEN).',
      'legal.mentions.body':
        '<section aria-labelledby="editeur"><h2 id="editeur">Éditeur du site</h2><p>Ce site est un portfolio personnel édité par&nbsp;:<br><strong>Eliot Giraud</strong><br>7 rue de la Paix, 74000 Annecy, France<br>E-mail&nbsp;: <a href="mailto:eliotgiraud.pro@outlook.fr">eliotgiraud.pro@outlook.fr</a></p><p>Le site présente un parcours de formation et d’expérience professionnelle. Il n’est pas un site de commerce électronique.</p></section><section aria-labelledby="publication"><h2 id="publication">Directeur de la publication</h2><p>Eliot Giraud.</p></section><section aria-labelledby="hebergement"><h2 id="hebergement">Hébergement</h2><p>Le site est hébergé via <strong>GitHub Pages</strong> (GitHub, Inc.).<br>Adresse&nbsp;: 88 Colin P. Kelly Jr Street, San Francisco, CA 94107, États-Unis.<br>Site&nbsp;: <a href="https://pages.github.com/" rel="noopener noreferrer" target="_blank">pages.github.com <span class="visually-hidden">(nouvel onglet)</span></a></p></section><section aria-labelledby="propriete"><h2 id="propriete">Propriété intellectuelle</h2><p>Les textes, la structure et les éléments graphiques produits pour ce portfolio sont la propriété d’Eliot Giraud, sauf mention contraire (logos de tiers, captures de projets). Toute reproduction non autorisée est interdite.</p></section><section aria-labelledby="responsabilite"><h2 id="responsabilite">Responsabilité</h2><p>Les liens vers des sites tiers (GitHub, LinkedIn, YouTube, kanam.io, probante.fr, etc.) ouvrent des pages indépendantes. L’éditeur n’est pas responsable de leur contenu ni de leurs pratiques.</p></section>',
      'legal.privacy.title': 'Politique de confidentialité',
      'legal.privacy.docTitle': 'Confidentialité · Eliot Giraud',
      'legal.privacy.lead':
        'Dernière mise à jour&nbsp;: 18 novembre 2026. Ce site respecte le RGPD et la loi «&nbsp;Informatique et Libertés&nbsp;».',
      'legal.privacy.body':
        '<section aria-labelledby="responsable"><h2 id="responsable">Responsable du traitement</h2><p>Eliot Giraud<br>7 rue de la Paix, 74000 Annecy<br><a href="mailto:eliotgiraud.pro@outlook.fr">eliotgiraud.pro@outlook.fr</a></p></section><section aria-labelledby="donnees"><h2 id="donnees">Données collectées</h2><p><strong>Aucune donnée personnelle n’est collectée via un formulaire sur ce site.</strong></p><ul><li>Pas de compte utilisateur, pas de newsletter, pas d’outil d’analyse (type Google Analytics).</li><li>Pas de cookies publicitaires ou de traceurs de mesure d’audience.</li><li>Si vous écrivez à l’adresse e-mail indiquée, le traitement se limite à la réponse à votre message (intérêt légitime / mesures précontractuelles).</li></ul></section><section aria-labelledby="stockage"><h2 id="stockage">Stockage local du navigateur</h2><p>Une préférence technique est enregistrée en <code>sessionStorage</code> / <code>localStorage</code> pour la langue. Ces informations restent dans votre navigateur.</p></section><section aria-labelledby="tiers"><h2 id="tiers">Services tiers</h2><p>Le site est hébergé sur GitHub Pages. Les polices, icônes SVG et scripts sont servis depuis ce dépôt. Les liens externes relèvent de leurs éditeurs.</p></section><section aria-labelledby="droits"><h2 id="droits">Vos droits</h2><p>Conformément au RGPD, vous disposez d’un droit d’accès, de rectification, d’effacement, de limitation, d’opposition et de portabilité. Contact&nbsp;: <a href="mailto:eliotgiraud.pro@outlook.fr">eliotgiraud.pro@outlook.fr</a>. Réclamation possible auprès de la <a href="https://www.cnil.fr/" rel="noopener noreferrer" target="_blank">CNIL</a>.</p></section>',
      'legal.a11y.title': 'Accessibilité',
      'legal.a11y.docTitle': 'Accessibilité · Eliot Giraud',
      'legal.a11y.lead':
        'Engagement pour un site utilisable au clavier, avec un lecteur d’écran, et respectueux de <code>prefers-reduced-motion</code>.',
      'legal.a11y.body':
        '<section aria-labelledby="statut"><h2 id="statut">Statut</h2><p>Ce portfolio vise la conformité au <strong>RGAA 4</strong> / WCAG 2.2 niveau AA sur les critères applicables à une page statique. Aucun audit formel tiers n’a encore été réalisé.</p></section><section aria-labelledby="mesures"><h2 id="mesures">Mesures prises</h2><ul><li>Langue de la page déclarée et bascule FR/EN.</li><li>Lien d’évitement vers le contenu principal.</li><li>Navigation clavier, focus visible, menu mobile accessible.</li><li>Contraste calibré pour le thème Nuit &amp; ambre.</li><li>Animations réduites si demandé par le système.</li></ul></section><section aria-labelledby="limites"><h2 id="limites">Limites connues</h2><ul><li>Certaines captures de projets anciennes peuvent manquer de description détaillée.</li></ul></section><section aria-labelledby="signalement"><h2 id="signalement">Signaler un problème</h2><p>Contact&nbsp;: <a href="mailto:eliotgiraud.pro@outlook.fr?subject=Accessibilit%C3%A9%20portfolio">eliotgiraud.pro@outlook.fr</a>.</p></section>'
    },
    en: {
      'meta.title': 'Eliot Giraud | Full-stack web developer | Annecy',
      'meta.description':
        'Eliot Giraud, full-stack web developer in Annecy. MBA at My Digital School, Darewell apprenticeship (kanam.io, probante.fr), SAFACT project, Vinatis e-commerce.',
      'skip': 'Skip to content',
      'nav.label': 'Main navigation',
      'nav.homeAria': 'Eliot Giraud, home',
      'nav.home': 'Home',
      'nav.about': 'About',
      'nav.experience': 'Experience',
      'nav.skills': 'Skills',
      'nav.ai': 'AI',
      'nav.projects': 'Projects',
      'nav.contact': 'Contact',
      'nav.open': 'Open menu',
      'nav.close': 'Close menu',
      'lang.label': 'Language',
      'hero.kicker': 'Full-stack web developer',
      'hero.tagline': 'MBA My Digital School · Darewell apprenticeship · Annecy',
      'hero.cta.projects': 'View projects',
      'hero.cta.cv': 'CV PDF',
      'hero.scroll': 'Go to About section',
      'hero.portraitAlt': 'Portrait of Eliot Giraud',
      'aria.newTab': '(opens in a new tab)',
      'aria.linkedin': 'LinkedIn (opens in a new tab)',
      'aria.github': 'GitHub (opens in a new tab)',
      'aria.cv': 'Download CV as PDF (opens in a new tab)',
      'about.title': 'About me',
      'about.p1':
        'I am <strong class="accent">24</strong> and in the second year of a full-stack development MBA at <strong class="accent">My Digital School</strong>. As an apprentice at <strong class="accent">Darewell</strong>, I work on <strong class="accent">kanam.io</strong> (HRIS) and <strong class="accent">probante.fr</strong> (training organizations), from UI to API. Previously, I completed a bachelor apprenticeship year at <strong class="accent">Vinatis</strong> (2024-2025) on e-commerce (Vue, Nuxt).',
      'about.p2':
        'Curious and rigorous, I like shipping readable, maintainable code aligned with business needs, whether for a public site or an internal tool.',
      'about.aside': 'Outside of code',
      'about.music':
        '<strong>Music</strong> is a real part of my daily life. I bought <strong>FL Studio</strong> and I am starting to create my own sounds, exploring production step by step. <strong>Diabolo</strong> helps me stay focused, and <strong>snowboarding</strong> in winter gets me off the keyboard and challenges me differently.',
      'about.diaboloAlt': 'Eliot practicing diabolo',
      'about.snowAlt': 'Eliot snowboarding',
      'exp.title': 'Experience',
      'exp.intro': 'Current apprenticeship at Darewell, after a bachelor e-commerce year at Vinatis.',
      'exp.role': 'Web developer apprentice',
      'exp.darewell.meta': 'MBA My Digital School · 2025 – 2027',
      'exp.darewell.li1':
        '<a href="https://kanam.io/" target="_blank" rel="noopener noreferrer">kanam.io <span class="visually-hidden">(opens in a new tab)</span></a>: HRIS (employees, leave, reviews, skills).',
      'exp.darewell.li2':
        '<a href="https://probante.fr/" target="_blank" rel="noopener noreferrer">probante.fr <span class="visually-hidden">(opens in a new tab)</span></a>: software for training organizations (registrations, attendance, billing).',
      'exp.darewell.li3':
        'Teamwork on two existing codebases: interfaces, business flows, quality, and client needs.',
      'exp.darewell.stack': 'Stack: React, Node.js, Bootstrap, NoSQL',
      'exp.vinatis.meta': 'Bachelor My Digital School · 2024 – 2025',
      'exp.vinatis.li1': 'E-commerce site, back office, and business tools (orders, inventory).',
      'exp.vinatis.li2':
        'Strong upskilling on <strong>Vue.js</strong>, <strong>Nuxt</strong>, and the modern front-end ecosystem.',
      'exp.vinatis.li3':
        'Symfony, Docker, PrestaShop: integration and maintenance in real conditions.',
      'exp.vinatis.stack': 'Stack: Vue, Nuxt, Symfony, Docker, PrestaShop',
      'skills.title': 'Skills',
      'skills.intro':
        'From UI components to data persistence: modern JavaScript stacks and PHP/Symfony foundations.',
      'skills.replay': 'Replay animation',
      'skills.replayAria': 'Replay the skills animation',
      'skills.front': 'Front-end',
      'skills.back': 'Back-end &amp; data',
      'skills.tools': 'Tools &amp; platforms',
      'ia.kicker': 'Method',
      'ia.title': 'My approach to AI',
      'ia.lead':
        'To me, AI is a bit like the calculator back then. Everyone is afraid of it, some want to ban it, and in the end it is just another tool that helps in daily life and at work. Not a magic wand, just a lever. I regularly try different AIs depending on the need, to see which one works best.',
      'ia.h1': 'Speed up without letting go of the wheel',
      'ia.p1':
        'Day to day I build in <strong class="accent">Cursor</strong>. I use it to explore an API, unblock a bug, or draft a first pass of tests and docs. Then I review, decide, and fix. Production code stays mine.',
      'ia.h2': 'Learn in short loops',
      'ia.p2':
        'When I discover a concept, a stack, or a tool, I ask for focused explanations. I restate the idea in my own words, then I validate it on a real need.',
      'ia.h3': 'Save time where it matters',
      'ia.p3':
        'For writing, interview prep, or structuring a feature, I let the tool draft a first pass. That way I can spend my energy on the product, the domain, and quality.',
      'projects.title': 'Projects',
      'projects.intro':
        'Concrete proof: a real client, full-stack products, and a few shorter builds.',
      'marquee.label': 'Project preview strip',
      'marquee.help':
        'Previews scroll automatically. Click and drag to scrub faster.',
      'marquee.enlarge': 'Enlarge',
      'lightbox.label': 'Enlarged preview',
      'lightbox.close': 'Close preview',
      'tag.client': 'Client',
      'tag.fullstack': 'Full-stack',
      'tag.hosting': 'Hosting',
      'tag.docs': 'Documentation',
      'tag.desktop': 'Desktop',
      'tag.spotify': 'Spotify',
      'tag.music': 'Music',
      'tag.media': 'Media',
      'tag.vps': 'VPS',
      'tag.webapp': 'Web app',
      'tag.roles': 'Roles',
      'tag.showcase': 'Showcase site',
      'tag.api': 'API',
      'tag.game': 'Game',
      'link.viewApp': 'View app',
      'link.viewSite': 'View site',
      'link.viewDemo': 'View demo',
      'link.github': 'Code on GitHub',
      'thumb.safact': 'SAFACT app (opens in a new tab)',
      'thumb.bass': 'BassOrder website (opens in a new tab)',
      'thumb.smeggMusic': 'SMEGG, music sharing',
      'thumb.grosmino': "Grosmino's repository",
      'thumb.gaudi': 'Gaudi Museum demo',
      'thumb.granny': 'Granny Smith Annecy',
      'thumb.eco': 'ECOMOBIL repository on GitHub',
      'thumb.morpion': 'Tic-tac-toe repository on GitHub',
      'alt.safact': 'Preview of the SAFACT business app',
      'alt.bass': 'BassOrder preview, music sorting app',
      'alt.smeggMusic': 'SMEGG music integration (Spotify, Deezer, etc.)',
      'alt.grosmino': "Grosmino's preview, meal ordering app",
      'alt.gaudi': 'Gaudi museum site preview',
      'alt.granny': 'Granny Smith site preview',
      'alt.eco': 'ECOMOBIL preview',
      'alt.morpion': 'Tic-tac-toe game preview',
      'safact.title': 'SAFACT, land management',
      'safact.year': '2026',
      'safact.body':
        'Personal project for a client: internal business app to track administrative acts and land procedures (municipalities, case files, documents, Word/PDF templates, follow-ups, reports). A multi-month build, done end to end through production and documentation. Live at <a href="https://app.safact.fr/" target="_blank" rel="noopener noreferrer">app.safact.fr <span class="visually-hidden">(opens in a new tab)</span></a>.',
      'safact.stack': 'Stack: Nuxt · Vue · TypeScript · Tailwind · Prisma · PostgreSQL · Docker',
      'bass.title': 'BassOrder, music sorting',
      'bass.year': '2026',
      'bass.body':
        'Windows desktop app (macOS coming) to clean up a messy library: Spotify playlists / likes and local folders, genre suggestions, then copy or move into Rock, Jazz, Hip-Hop, Electro, and more. Site and downloads at <a href="https://bassorder.smegg.cloud/" target="_blank" rel="noopener noreferrer">bassorder.smegg.cloud <span class="visually-hidden">(opens in a new tab)</span></a>.',
      'bass.stack': 'Stack: Tauri · React · TypeScript · Rust · Vite',
      'smegg.title': 'SMEGG, social network',
      'smegg.year': '2026',
      'smegg.body':
        'Web app built with two friends to stay connected: photo and video posts, groups, private messaging, with music at the center (Spotify, Deezer, SoundCloud, YouTube previews). Self-hosted on a personal VPS: app, API, and database.',
      'smegg.stack': 'Stack: Nuxt · Vue · Tailwind · MySQL · PWA',
      'grosmino.title': "Grosmino's, meal delivery",
      'grosmino.year': '2025',
      'grosmino.body':
        'Uber Eats-style project: restaurant space, customer flow, and admin back office to run the platform (separated roles).',
      'grosmino.stack': 'Stack: Nuxt · Vue · TypeScript · Tailwind CSS',
      'gaudi.title': 'Gaudi Museum',
      'gaudi.year': '2024',
      'gaudi.body': "Showcase site for a museum: tour and presentation of Gaudi's work.",
      'gaudi.stack': 'Stack: HTML · CSS',
      'granny.title': 'Granny Smith',
      'granny.year': '2024',
      'granny.body': 'Showcase site for a restaurant in Annecy.',
      'granny.stack': 'Stack: HTML · CSS · JavaScript',
      'eco.title': 'ECOMOBIL',
      'eco.year': '2024',
      'eco.body': 'Vehicle booking (scooters, bikes…). Demo not hosted.',
      'eco.stack': 'Stack: PHP · HTML · CSS · MySQL',
      'morpion.title': 'Tic-tac-toe 1v1',
      'morpion.year': '2024',
      'morpion.body': 'Local interactive game with a graphical interface.',
      'morpion.stack': 'Stack: Python · Tkinter',
      'cap.safact.home': 'SAFACT · Home',
      'cap.safact.clients': 'SAFACT · Clients',
      'cap.safact.files': 'SAFACT · Cases',
      'cap.safact.lib': 'SAFACT · Library',
      'cap.safact.reports': 'SAFACT · Reports',
      'cap.smegg.music': 'SMEGG · Music',
      'cap.gaudi': 'Gaudi Museum',
      'contact.title': 'Contact',
      'contact.lead':
        'For a project, a full-time role, or just a chat: email me, I reply quickly.',
      'footer.legal': 'Legal information',
      'footer.mentions': 'Legal notice',
      'footer.privacy': 'Privacy',
      'footer.a11y': 'Accessibility',
      'footer.credit': 'Site by <a href="index.html">Eliot Giraud</a> · © 2026',
      'legal.back': 'Back to home',
      'legal.mentions.title': 'Legal notice',
      'legal.mentions.docTitle': 'Legal notice · Eliot Giraud',
      'legal.mentions.lead':
        'Information required by French digital economy law (LCEN).',
      'legal.mentions.body':
        '<section aria-labelledby="editeur"><h2 id="editeur">Publisher</h2><p>This site is a personal portfolio published by&nbsp;:<br><strong>Eliot Giraud</strong><br>7 rue de la Paix, 74000 Annecy, France<br>Email&nbsp;: <a href="mailto:eliotgiraud.pro@outlook.fr">eliotgiraud.pro@outlook.fr</a></p><p>The site presents education and professional experience. It is not an e-commerce site.</p></section><section aria-labelledby="publication"><h2 id="publication">Publication director</h2><p>Eliot Giraud.</p></section><section aria-labelledby="hebergement"><h2 id="hebergement">Hosting</h2><p>Hosted via <strong>GitHub Pages</strong> (GitHub, Inc.).<br>Address&nbsp;: 88 Colin P. Kelly Jr Street, San Francisco, CA 94107, USA.<br>Website&nbsp;: <a href="https://pages.github.com/" rel="noopener noreferrer" target="_blank">pages.github.com <span class="visually-hidden">(opens in a new tab)</span></a></p></section><section aria-labelledby="propriete"><h2 id="propriete">Intellectual property</h2><p>Texts, structure, and graphics produced for this portfolio belong to Eliot Giraud unless stated otherwise. Unauthorized reproduction is prohibited.</p></section><section aria-labelledby="responsabilite"><h2 id="responsabilite">Liability</h2><p>Links to third-party sites open independent pages. The publisher is not responsible for their content or practices.</p></section>',
      'legal.privacy.title': 'Privacy policy',
      'legal.privacy.docTitle': 'Privacy · Eliot Giraud',
      'legal.privacy.lead':
        'Last update: 18 November 2026. This site complies with the GDPR and French data-protection law.',
      'legal.privacy.body':
        '<section aria-labelledby="responsable"><h2 id="responsable">Data controller</h2><p>Eliot Giraud<br>7 rue de la Paix, 74000 Annecy<br><a href="mailto:eliotgiraud.pro@outlook.fr">eliotgiraud.pro@outlook.fr</a></p></section><section aria-labelledby="donnees"><h2 id="donnees">Collected data</h2><p><strong>No personal data is collected through a form on this site.</strong></p><ul><li>No user accounts, newsletter, or analytics tools (such as Google Analytics).</li><li>No advertising cookies or audience trackers.</li><li>If you email the address shown, processing is limited to answering your message.</li></ul></section><section aria-labelledby="stockage"><h2 id="stockage">Browser local storage</h2><p>Technical preferences are stored in <code>sessionStorage</code> / <code>localStorage</code> for the language preference. They stay in your browser.</p></section><section aria-labelledby="tiers"><h2 id="tiers">Third-party services</h2><p>The site is hosted on GitHub Pages. Fonts, SVG icons, and scripts are served from this repository. External links are governed by their own publishers.</p></section><section aria-labelledby="droits"><h2 id="droits">Your rights</h2><p>Under the GDPR you have rights of access, rectification, erasure, restriction, objection, and portability. Contact: <a href="mailto:eliotgiraud.pro@outlook.fr">eliotgiraud.pro@outlook.fr</a>. You may also file a complaint with the <a href="https://www.cnil.fr/" rel="noopener noreferrer" target="_blank">CNIL</a>.</p></section>',
      'legal.a11y.title': 'Accessibility',
      'legal.a11y.docTitle': 'Accessibility · Eliot Giraud',
      'legal.a11y.lead':
        'Commitment to a site usable with keyboard and screen readers, respectful of <code>prefers-reduced-motion</code>.',
      'legal.a11y.body':
        '<section aria-labelledby="statut"><h2 id="statut">Status</h2><p>This portfolio aims for <strong>RGAA 4</strong> / WCAG 2.2 AA compliance on criteria applicable to a static page. No formal third-party audit has been completed yet.</p></section><section aria-labelledby="mesures"><h2 id="mesures">Measures taken</h2><ul><li>Page language declared with FR/EN switching.</li><li>Skip link to main content.</li><li>Keyboard navigation, visible focus, accessible mobile menu.</li><li>Contrast calibrated for the Night &amp; Amber theme.</li><li>Reduced motion when requested by the system.</li></ul></section><section aria-labelledby="limites"><h2 id="limites">Known limits</h2><ul><li>Some older project screenshots may lack detailed descriptions.</li></ul></section><section aria-labelledby="signalement"><h2 id="signalement">Report an issue</h2><p>Contact: <a href="mailto:eliotgiraud.pro@outlook.fr?subject=Accessibility%20portfolio">eliotgiraud.pro@outlook.fr</a>.</p></section>'
    }
  };

  function normalizeLang(lang) {
    return lang === 'en' ? 'en' : 'fr';
  }

  function getLang() {
    try {
      var stored = localStorage.getItem(STORAGE_KEY);
      if (stored) return normalizeLang(stored);
    } catch (_err) {
      /* ignore */
    }
    var nav = (navigator.language || 'fr').toLowerCase();
    return nav.indexOf('en') === 0 ? 'en' : 'fr';
  }

  function t(key, lang) {
    var L = normalizeLang(lang || getLang());
    if (dict[L] && dict[L][key] != null) return dict[L][key];
    if (dict.fr[key] != null) return dict.fr[key];
    return key;
  }

  function apply(lang) {
    var L = normalizeLang(lang);
    try {
      localStorage.setItem(STORAGE_KEY, L);
    } catch (_err) {
      /* ignore */
    }

    document.documentElement.lang = L;

    var titleKey = document.documentElement.getAttribute('data-i18n-title') || 'meta.title';
    var title = t(titleKey, L);
    if (title) document.title = title;

    var desc = document.querySelector('meta[name="description"]');
    var descKey = document.documentElement.getAttribute('data-i18n-desc');
    if (desc && (descKey || titleKey === 'meta.title')) {
      desc.setAttribute('content', t(descKey || 'meta.description', L));
    }

    var ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle && titleKey === 'meta.title') {
      ogTitle.setAttribute('content', title.replace(' | Annecy', ''));
    }

    var ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc && titleKey === 'meta.title') {
      ogDesc.setAttribute('content', t('meta.description', L));
    }

    var ogLocale = document.querySelector('meta[property="og:locale"]');
    if (ogLocale) ogLocale.setAttribute('content', L === 'en' ? 'en_US' : 'fr_FR');

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (!key) return;
      el.textContent = t(key, L);
    });

    document.querySelectorAll('[data-i18n-html]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-html');
      if (!key) return;
      el.innerHTML = t(key, L);
    });

    document.querySelectorAll('[data-i18n-attr]').forEach(function (el) {
      var raw = el.getAttribute('data-i18n-attr');
      if (!raw) return;
      raw.split(';').forEach(function (pair) {
        var parts = pair.split(':');
        if (parts.length < 2) return;
        var attr = parts[0].trim();
        var key = parts.slice(1).join(':').trim();
        if (attr && key) el.setAttribute(attr, t(key, L));
      });
    });

    document.querySelectorAll('[data-set-lang]').forEach(function (btn) {
      var active = btn.getAttribute('data-set-lang') === L;
      btn.setAttribute('aria-pressed', active ? 'true' : 'false');
      btn.classList.toggle('is-active', active);
    });

    var toggle = document.querySelector('.nav-toggle');
    if (toggle) {
      var open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-label', t(open ? 'nav.close' : 'nav.open', L));
    }

    document.dispatchEvent(
      new CustomEvent('portfolio:langchange', { detail: { lang: L } })
    );
  }

  function setupSwitcher() {
    document.querySelectorAll('[data-set-lang]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        apply(btn.getAttribute('data-set-lang'));
      });
    });
  }

  window.PortfolioI18n = {
    t: t,
    getLang: getLang,
    setLang: apply,
    apply: apply
  };

  document.addEventListener('DOMContentLoaded', function () {
    setupSwitcher();
    apply(getLang());
  });
})();
