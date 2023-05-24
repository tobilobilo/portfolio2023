const skills = {
    'HTML': {
        'icon': 'svg/skill-html.svg',
        'subskills': ['Sémantique', 'Accessibilité', 'Twig'],
        'animationdelay': '.4s',
        'extraclass': 'skills__logo--smaller'
    },
    'CSS': {
        'icon': 'svg/skill-css.svg',
        'subskills': ['SASS / LESS', 'Tailwind', 'Bootstrap', 'BEM'],
        'animationdelay': '.55s',
        'extraclass': 'skills__logo--smaller'
    },
    'Javascript': {
        'icon': 'svg/skill-js.svg',
        'subskills': ['ES6+', 'React', 'Vue.js', 'TypeScript', 'jQuery'],
        'animationdelay': '.7s',
        'extraclass': null
    },
    'UI / UX': {
        'icon': 'svg/skill-window.svg',
        'subskills': ['Photoshop', 'Illustrator', 'Figma'],
        'animationdelay': '.85s',
        'extraclass': null
    },
    'Outils': {
        'icon': 'svg/skill-toolbox.svg',
        'subskills': ['Git', 'Docker', 'Jira', 'Bitbucket'],
        'animationdelay': '1s',
        'extraclass': null
    },
}


const projects = {
    'Studios MELS': {
        'type': 'pro',
        'text': [
            'Site web corporatif des Studios MELS développé sous Wordpress.',
            'Reconnue mondialement pour ses studios de tournage et sa main d\'œuvre hautement qualifiée, MELS est l\'une des plus grandes entreprises de services de cinéma et de télévision au Canada. Elle propose un service clé en main, du scénario à la livraison.'
        ],
        'links': {
            'demo': 'https://www.mels-studios.com/fr/',
            'github': null
        },
        'imgs': {
            'preview': {
                'small': './images/previews/mels/mels_bg.jpg',
                'large': './images/previews/mels/mels_bg__lg.jpg'
            },
            'desktop': {
                'small': './images/previews/mels/mels_desktop.jpg',
                'large': './images/previews/mels/mels_desktop__lg.jpg'
            },
            'mobile': './images/previews/mels/mels_mobile.jpg'
        },
        'stack': ['Wordpress']
    },
    'Groupe TVA': {
        'type': 'pro',
        'text': [
            'Site web corporatif du Groupe TVA développé sous Drupal.',
            'Groupe TVA est une entreprise québécoise active dans les domaines de la télévision, du film et des magazines. Elle est une propriété de Québecor Média. Les principaux actifs de l\'entreprise incluent le réseau TVA ainsi que six de ses dix stations régionales et des chaînes spécialisées.'
        ],
        'links': {
            'demo': 'https://www.groupetva.ca/',
            'github': null
        },
        'imgs': {
            'preview': {
                'small': './images/previews/groupetva/groupetva_bg.jpg',
                'large': './images/previews/groupetva/groupetva_bg__lg.jpg'
            },
            'desktop': {
                'small': './images/previews/groupetva/groupetva_desktop.jpg',
                'large': './images/previews/groupetva/groupetva_desktop__lg.jpg'
            },
            'mobile': './images/previews/groupetva/groupetva_mobile.jpg'
        },
        'stack': ['Drupal']
    },
    'Mes Idées Recettes': {
        'type': 'perso',
        'text': [
            'Mes Idées Recettes est un projet motivé par le désir de me familiariser avec de nouvelles techs. L\'application puise ses données de l\'api gratuit The Meal DB. C\'est un projet uniquement front-end donc les données sont sauvegardées en local storage.',
            'Projet exploratoire du framework React, Tailwind CSS et du gestionnaire d\'états Redux Toolkit.'
        ],
        'links': {
            'demo': 'https://tobilobilo.github.io/idees-recettes',
            'github': 'https://github.com/tobilobilo/idees-recettes'
        },
        'imgs': {
            'preview': {
                'small': './images/previews/ideesrecettes/ideesrecettes_bg.jpg',
                'large': './images/previews/ideesrecettes/ideesrecettes_bg__lg.jpg'
            },
            'desktop': {
                'small': './images/previews/ideesrecettes/ideesrecettes_desktop.jpg',
                'large': './images/previews/ideesrecettes/ideesrecettes_desktop__lg.jpg'
            },
            'mobile': './images/previews/ideesrecettes/ideesrecettes_mobile.png'
        },
        'stack': ['React', 'Tailwind CSS', 'Redux Toolkit']
    },
    'Mastermind': {
        'type': 'perso',
        'text': [
            'Application du jeu Mastermind comprenant des fonctionnalités supplémentaires, comme la possibilité de choisir le nombre de couleurs, de colonnes et de rangées de combinaisons pour trouver la solution.',
            'Ce projet aurait été idéal à développer à l\'aide d\'un framework, mais je m\'étais donné comme défi de le faire en pur Javascript.'
        ],
        'links': {
            'demo': 'https://tobilobilo.github.io/mastermind/',
            'github': 'https://github.com/tobilobilo/mastermind'
        },
        'imgs': {
            'preview': {
                'small': './images/previews/mastermind/mastermind_bg.png',
                'large': './images/previews/mastermind/mastermind_bg__lg.png'
            },
            'desktop': {
                'small': './images/previews/mastermind/mastermind_desktop.png',
                'large': './images/previews/mastermind/mastermind_desktop__lg.png'
            },
            'mobile': './images/previews/mastermind/mastermind_mobile.png'
        },
        'stack': ['ES6']
    },
    'Bingo': {
        'type': 'perso',
        'text': [
            'Application du jeu de Bingo avec quelques aspects paramétrables tels que : le nombre de joueurs et le type de grilles. Deux choix de grilles sont disponibles (le classique 5x5 et une version 9x9).',
            'Ce projet a été développé avec la version CLI de Vue.js 2.'
        ],
        'links': {
            'demo': 'https://tobilobilo.github.io/bingo/',
            'github': 'https://github.com/tobilobilo/bingo'
        },
        'imgs': {
            'preview': {
                'small': './images/previews/bingo/bingo_bg.png',
                'large': './images/previews/bingo/bingo_bg__lg.png'
            },
            'desktop': {
                'small': './images/previews/bingo/bingo_desktop.png',
                'large': './images/previews/bingo/bingo_desktop__lg.png'
            },
            'mobile': './images/previews/bingo/bingo_mobile.png'
        },
        'stack': ['Vue.js', 'Bootstrap']
    },
    'Agrégateur d\'annonces Kijiji': {
        'type': 'perso',
        'text': [
            'Application qui récupère différents flux RSS provenant de Kijiji et les affiches automatiques aux 30 secondes.',
            'C\'est un projet que j\'ai développé, il y a plusieurs années et dont je me sers encore fréquemment pour trouver des objets de seconde main ou de collection.'
        ],
        'links': {
            'demo': 'http://mads.epizy.com/?p=demo',
            'github': 'https://github.com/tobilobilo/kijiji-scrapper'
        },
        'imgs': {
            'preview': {
                'small': './images/previews/scrapper/scrapper_bg.png',
                'large': './images/previews/scrapper/scrapper_bg__lg.png'
            },
            'desktop': {
                'small': './images/previews/scrapper/scrapper_desktop.jpg',
                'large': './images/previews/scrapper/scrapper_desktop__lg.jpg'
            },
            'mobile': './images/previews/scrapper/scrapper_mobile.jpg'
        },
        'stack': ['jQuery', 'PHP']
    },
    'Tic Tac Toe': {
        'type': 'perso',
        'text': [
            'Application du jeu classique Tic Tac Toe comprenant des fonctionnalités supplémentaires, telles que : la possibilité de jouer jusqu\'à 4 joueurs, de nommer les joueurs et d\'assurer le suivi des statistiques. La grille de jeu est modifiable, allant du classique 3x3 jusqu\'à 10x10.',
            'Ce projet a été développé avec la version précompilée de Vue.js 2. Il a été mon projet initial sous ce framework.'
        ],
        'links': {
            'demo': 'https://tobilobilo.github.io/tic-tac-toe/',
            'github': 'https://github.com/tobilobilo/tic-tac-toe'
        },
        'imgs': {
            'preview': {
                'small': './images/previews/tictactoe/tictactoe_bg.png',
                'large': './images/previews/tictactoe/tictactoe_bg__lg.png'
            },
            'desktop': {
                'small': './images/previews/tictactoe/tictactoe_desktop.png',
                'large': './images/previews/tictactoe/tictactoe_desktop__lg.png'
            },
            'mobile': './images/previews/tictactoe/tictactoe_mobile.png'
        },
        'stack': ['Vue.js', 'Bootstrap']
    }
}