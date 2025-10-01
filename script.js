// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.navbar') && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    // Mobile tabs hamburger functionality
    initMobileTabsHamburger();
    
    // Recipe category tabs functionality
    initRecipeCategoryTabs();
});

// Mobile tabs hamburger functionality
function initMobileTabsHamburger() {
    const tabsHamburgers = document.querySelectorAll('.tabs-hamburger');
    
    tabsHamburgers.forEach(hamburger => {
        hamburger.addEventListener('click', function() {
            const tabsMenu = this.parentElement.querySelector('.tabs-menu');
            const isActive = this.classList.contains('active');
            
            // Close all other hamburger menus
            tabsHamburgers.forEach(h => {
                if (h !== this) {
                    h.classList.remove('active');
                    h.parentElement.querySelector('.tabs-menu').classList.remove('mobile-visible');
                }
            });
            
            // Toggle current menu
            this.classList.toggle('active');
            tabsMenu.classList.toggle('mobile-visible');
        });
    });

    // Close mobile tabs menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.tabs-nav')) {
            tabsHamburgers.forEach(hamburger => {
                hamburger.classList.remove('active');
                hamburger.parentElement.querySelector('.tabs-menu').classList.remove('mobile-visible');
            });
        }
    });

    // Close mobile tabs menu when selecting a tab
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            tabsHamburgers.forEach(hamburger => {
                hamburger.classList.remove('active');
                hamburger.parentElement.querySelector('.tabs-menu').classList.remove('mobile-visible');
            });
        });
    });
}

// Recipe category tabs functionality
function initRecipeCategoryTabs() {
    const categoryTabsHamburger = document.querySelector('.category-tabs-hamburger');
    const categoryTabsMenu = document.querySelector('.category-tabs-menu');
    const categoryTabBtns = document.querySelectorAll('.category-tab-btn');
    const recipeCards = document.querySelectorAll('.recipe-card');

    // Mobile hamburger functionality for category tabs
    if (categoryTabsHamburger && categoryTabsMenu) {
        categoryTabsHamburger.addEventListener('click', function() {
            const isActive = this.classList.contains('active');
            
            // Toggle current menu
            this.classList.toggle('active');
            categoryTabsMenu.classList.toggle('mobile-visible');
        });

        // Close mobile category tabs menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.recipe-category-tabs')) {
                categoryTabsHamburger.classList.remove('active');
                categoryTabsMenu.classList.remove('mobile-visible');
            }
        });
    }

    // Category filtering functionality
    categoryTabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const selectedCategory = this.getAttribute('data-category');
            
            // Remove active class from all buttons
            categoryTabBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Filter recipe cards
            recipeCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                if (selectedCategory === 'all' || cardCategory === selectedCategory) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
            
            // Close mobile menu after selection
            if (categoryTabsHamburger && categoryTabsMenu) {
                categoryTabsHamburger.classList.remove('active');
                categoryTabsMenu.classList.remove('mobile-visible');
            }
            
            // Reset card slider position when filtering
            cardSliderPositions['recipes'] = 0;
            updateCardSliderButtons('recipes');
            createPaginationDots('recipes');
            updatePaginationDots('recipes');
            
            // Reset transform
            const container = document.getElementById('recipes-container');
            if (container) {
                container.style.transform = 'translateX(0px)';
            }
        });
    });
}

// Carousel functionality
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;

function showSlide(index) {
    const track = document.querySelector('.carousel-slides');
    if (track) {
        track.style.transform = `translateX(-${index * 100}%)`;
    }
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
    });
    updateHighlightsDots();
}

function changeSlide(direction) {
    currentSlide += direction;
    
    if (currentSlide >= totalSlides) {
        currentSlide = 0;
    } else if (currentSlide < 0) {
        currentSlide = totalSlides - 1;
    }
    
    showSlide(currentSlide);
}

function goToSlide(index) {
    currentSlide = index;
    showSlide(currentSlide);
}

// Initialize highlights carousel dots
function initHighlightsDots() {
    const dotsContainer = document.getElementById('highlights-dots');
    if (!dotsContainer) return;
    
    // Clear existing dots
    dotsContainer.innerHTML = '';
    
    // If more than 10 slides, show line with active dot
    if (totalSlides > 10) {
        const lineContainer = document.createElement('div');
        lineContainer.className = 'pagination-line-container';
        
        const line = document.createElement('div');
        line.className = 'pagination-line';
        
        const activeDot = document.createElement('div');
        activeDot.className = 'pagination-line-dot active';
        
        lineContainer.appendChild(line);
        lineContainer.appendChild(activeDot);
        dotsContainer.appendChild(lineContainer);
        
        // Add click handler to the line container
        lineContainer.addEventListener('click', (e) => {
            const rect = lineContainer.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const percentage = clickX / rect.width;
            const slideIndex = Math.round(percentage * (totalSlides - 1));
            goToSlide(slideIndex);
        });
    } else {
        // Create dots for each slide (original behavior)
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('div');
            dot.className = 'pagination-dot';
            if (i === 0) dot.classList.add('active');
            
            dot.addEventListener('click', () => {
                goToSlide(i);
            });
            
            dotsContainer.appendChild(dot);
        }
    }
}

function updateHighlightsDots() {
    const dotsContainer = document.getElementById('highlights-dots');
    if (!dotsContainer) return;
    
    if (totalSlides > 10) {
        // Update line-based pagination
        const lineContainer = dotsContainer.querySelector('.pagination-line-container');
        const activeDot = dotsContainer.querySelector('.pagination-line-dot');
        
        if (lineContainer && activeDot) {
            const percentage = (currentSlide / (totalSlides - 1)) * 100;
            activeDot.style.left = `${percentage}%`;
        }
    } else {
        // Update individual dots (original behavior)
        const dots = dotsContainer.querySelectorAll('.pagination-dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }
}

// Auto-advance disabled for highlights carousel

// Initialize highlights dots when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initHighlightsDots();
    
    // Ensure carousel is properly initialized
    const slides = document.querySelectorAll('.slide');
    if (slides.length > 0) {
        showSlide(0); // Show first slide on load
    }
});

// Tab functionality
document.addEventListener('DOMContentLoaded', function() {
    // Portfolio tabs
    const portfolioTabBtns = document.querySelectorAll('#portfolio .tab-btn');
    const portfolioTabContents = document.querySelectorAll('#portfolio .tab-content');

    portfolioTabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.getAttribute('data-tab');
            
            // Remove active class from all buttons and contents
            portfolioTabBtns.forEach(b => b.classList.remove('active'));
            portfolioTabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            btn.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });

    // Resources tabs
    const resourcesTabBtns = document.querySelectorAll('#resources .tab-btn');
    const resourcesTabContents = document.querySelectorAll('#resources .tab-content');

    resourcesTabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.getAttribute('data-tab');
            
            // Remove active class from all buttons and contents
            resourcesTabBtns.forEach(b => b.classList.remove('active'));
            resourcesTabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            btn.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });
});

// Modal functionality
const modalData = {
    // Portfolio modals
    'project1': {
        title: 'Personal Website',
        purpose: 'An accessible and informative website showcasing my professional background as well as my hobbies for both a professional and personal context. Built to challenge myself and learn new technologies, this website became a creative playground.',
        roadmap: {
            achieved: [
                'Responsive design implementation',
                'Dynamic content management system',
                'Carousel functionality with touch/swipe support',
                'Modal system for detailed information',
                'Mobile navigation and hamburger menu',
                'Smooth animations and transitions'
            ],
            next: [
                'Keep the website updated with new contents',
                'Migrate to React',
                'Database integration for content management',
                'Interactive demo section with project showcases'
            ]
        }
    },
    'project2': {
        title: 'Airbnb Scrapping',
        activities: [
            {
                image: 'img/portfolio/AirbnbMap.png',
                description: 'Data collection of Saint-Malo Airbnb rental market to compare them to my friend apartment price'
            },
            {
                image: '',
                description: 'Find correlation between rental prices and rental parameters (surface, number of bedrooms, etc.). Create a model to predict rental prices.'
            },
        ],
        exploreNext: [
            'Comparing rental prices expectations with buying prices on the housing market to find investment opportunities',
            'Add the booking availability to the model as it is a relevant factor'
        ]
    },
    'project3': {
        title: 'Facility Location',
        activities: [
            {
                image: '',
                description: 'Leveraging my Linear programming knowledge and with the help of Google OR-Tools solver, I was able to find the optimal location for new facilities in a given problem.'
            },
            {
                image: 'img/portfolio/FacilityLocationPlot.png',
                description: 'Display the optimal location for a new facilities. Visualy understand the choices of the model. Ready-to-share state of the project.'
            }
        ],
        exploreNext: [
            'Add new parameters to the model to make it even more cost accurate and beneficial for the company',
            'Get more realistic data to make the model even more accurate (real road distance, etc.)',
            'Upgrade to real-time parameter and use the model for a shipping company (facility to customer)'
        ]
    },
    'project4': {
        title: 'Business Operations Webapp',
        purpose: 'My vision for this webapp is to make accessible tools to visualize, clarify and optimize business operations for common users and small businesses. This app can be compared to Airbnb for businesses. Leveraging my operation research knowledge, I am integrating optimization tools so business can make better decisions daily. The webapp was created in September 2025 and is still in development.',
        roadmap: {
            achieved: [
                'Website frontend with React and Vite',
                'Website backend with Python and FastAPI',
                'Database integration with PostgreSQL',
                'Dashboard with key performance indicators (KPIs)',
                'Inventory management coupled with demand forecasting systems',
                'Market Analysis and competitive benchmarking',
                'Financial reporting and analytics module',
                'API integration for third-party services',
                'Automated workflow notifications'
            ],
            next: [
                'AI integration for app versatility',
                'Upload data from different sources',
                'User authentication and role-based access control',
                'Live demo of the webapp',
                'Advanced analytics with machine learning predictions'
            ]
        }
    },
    'edu1': {
        title: 'Texas A&M University',
        image: 'https://thebatt.com/wp-content/uploads/2024/10/CJS13047-1200x800.jpg',
        description: 'Master of Science in Industrial Engineering. Advanced studies in operations research, supply chain management, and data analysis with focus on optimization and process improvement.',
        datePeriod: 'January 2024 – May 2025',
        coursework: [
            'ISEN 608 - Industrial Case Analysis',
            'ISEN 609 - Probability for Engineering Decision',
            'ISEN 613 - Engineering Data Analysis',
            'ISEN 614 - Advanced Quality Engineering',
            'ISEN 617 - Quantitative Modeling for Supply Chain',
            'ISEN 622 - Linear Programming',
            'ISEN 623 - Nonlinear & Dynamic Programming',
            'ISEN 625 - Simulation Methods and Applications',
            'ISEN 663 - Management Control System',
            'ISEN 667 - Engineering Economy'
        ],
        volunteering: [
            'French Club Treasurer',
            'Judo Club Regular Member'
        ]
    },
    'edu2': {
        title: 'Arts et Métiers ParisTech',
        image: 'https://phototheque.artsetmetiers.fr/_data/i/upload/2023/04/07/20230407103259-20b39924-me.jpg',
        description: 'Engineering School specializing in mechanical and industrial engineering. Comprehensive program combining theoretical knowledge with practical applications in manufacturing and design.',
        datePeriod: 'September 2021 – June 2023',
        coursework: [
            'Mechanical Engineering Fundamentals',
            'Manufacturing Processes',
            'CAD/CAM Systems',
            'Materials Science',
            'Thermodynamics and Fluid Mechanics',
            'Control Systems',
            'Industrial Design',
            'Project Management',
            'Industrial Economics'
        ],
        volunteering: [
            'Student Association Member'
        ]
    },
    'exp1': {
        title: 'French Teaching Assistant',
        company: 'Texas A&M University',
        image: 'https://stories.tamu.edu/wp-content/uploads/2019/09/151020_Pano_0397.jpg',
        description: 'Teaching French language and culture to undergraduate students at Texas A&M University.',
        datePeriod: 'Aug 2024 – May 2025',
        tasks: [
            'Hold lab classes and tutoring sessions to help students learn French.',
            'Conduct interview to evaluate student\'s oral skills'
        ]
    },
    'exp2': {
        title: 'Machine Operator Intern',
        company: 'Cordon Electronics',
        image: 'https://www.unexo.fr/wp-content/uploads/2023/07/cordongroup-visuel02-online.jpg',
        description: 'Operated and maintained industrial machinery in an electronics manufacturing environment. Learned production processes and quality control procedures.',
        datePeriod: 'Jun 2024 – Aug 2024',
        tasks: [
            'Carry functional tests on internet and TV boxes.',
            'Assisted production team launch of a semi-automatic test bench, improving test speed and accuracy.',
        ]
    },
    'exp3': {
        title: 'Server',
        company: 'Cecco Restaurant',
        image: 'img/portfolio/Cecco.jpg',
        description: 'Provided customer service in a fast-paced restaurant environment. Managed multiple tables and ensured positive dining experiences for guests.',
        datePeriod: 'Jul 2020 – Aug 2020',
        tasks: [
        ]
    },
    'memory1': {
        title: 'Adventure in Florida',
        date: 'Summer & Winter 2024',
        description: '',
        pictures: [
            {
                image: 'img/memories/Fishing.jpg',
                caption: 'Went for a full day saltwater fishing and caught plenty of fish including a young hammer shark, enought for a nice taco dinner as a reward.',
                height: 300
            }
        ]
    },
    'memory2': {
        title: 'Judo Journey',
        date: 'Since 2007',
        description: 'Two years of martial arts discipline, building not just physical strength but mental resilience and character.',
        pictures: [
            {
                image: 'img/memories/Judo.jpg',
                caption: 'Reunion with my judo sensei and my best friend for a few hours of training.',
                positionX: 0,
                positionY: -50,
                height: 400
            }
        ]
    },
    'memory3': {
        title: 'Gadzart Journey',
        date: 'Since 2021',
        description: '',
         pictures: [
             {
                 image: 'img/memories/Fignos.jpg',
                 caption: 'The traditional "Gala des Fignos" welcome the new Gadzart members',
                 positionX: 0,
                 positionY: 0,
                 height: 250
             },
             {
                 image: 'img/memories/Flamme.jpg',
                 caption: 'Proudly took part in the rekindling of the flame of the unknown soldier, the symbol of the spirit of the nation that should never be extinguished. We were a couple of hundreds Gadzarts.',
                 positionX: 0,
                 positionY: -80,
                 height: 350
             }
         ]
    },
    'memory4': {
        title: 'My Beautiful Cats',
        date: 'Since 2010',
        description: '',
         pictures: [
             {
                 image: 'img/memories/bb_titi.JPG',
                 caption: '',
                 positionY: 0,
                 height: 500
             },
             {
                 image: 'img/memories/Ticou_bois.JPG',
                 caption: 'Ticou chillin\' on the wood',
                 height: 250
             },
             {
                 image: 'img/memories/Moonette.JPG',
                 caption: '',
                 height: 300,
                 positionX: 0,
                 positionY: -200
             }
         ]
    },
    'memory5': {
        title: 'My First Skydive',
        date: '2017',
        description: 'An unforgettable experience jumping from 14,000 feet - conquering fears and embracing the ultimate adrenaline rush.',
        videoUrl: 'https://drive.google.com/file/d/10oveevDef1szUHQbZEf0c0zT8HqBFqDq/preview',
        thumbnail: 'img/memories/skydive_thumbnail.jpg',
        isVideo: true
    },
    // Recipe modals - grouped together
    'recipe1': {
        title: 'Far Breton',
        category: 'Patisserie',
        image: 'https://i.pinimg.com/736x/88/53/49/88534967321a2a641eeac2c11faeb6cd.jpg',
        description: 'Traditional French dessert from Brittany, a custard-like cake with prunes.',
        servings: '6 servings',
        ingredients: [
            '20 dried Prunes',
            '200g Flour',
            '150g Sugar',
            '4 eggs',
            '75cl Milk'
        ],
        cookingSteps: [
            'Preheat oven to 170°C (340°F)',
            'Mix flour, sugar and eggs in a bowl',
            'Add milk gradually, whisking until smooth',
            'Butter the baking dish',
            'Drain prunes and arrange in baking dish',
            'Pour batter over prunes',
            'Bake for 40 minutes until golden'
        ],
        modifications: 'Add rum to the batter for extra flavor.',
        videoTutorial: null
    },
    'recipe2': {
        title: 'Flan Patissier',
        category: 'Patisserie',
        image: 'https://i.pinimg.com/736x/35/35/c7/3535c7ac92c74c1ff0ef2a07212df00f.jpg',
        description: 'Classic French custard tart with a buttery pastry crust.',
        servings: '8 servings',
        ingredients: [
            'Pâte sablée: 250g Flour, 100g sugar, 80g Butter, 1 Egg, Cinnamon',
            'Crème patissière: 1L Milk, 4 Eggs, 150g Sugar, 90g Corn flour, Vanilla'
        ],
        cookingSteps: [
            'Prepare pâte brisée and line tart pan',
            'Make crème patissière by heating milk with vanilla',
            'Whisk eggs, sugar, and corn flour together',
            'Pour hot milk over egg mixture, whisking constantly',
            'Return to heat and cook until thickened',
            'Pour into prepared crust and bake for 30 minutes'
        ],
        modifications: 'Replace vanilla by cacao powder (1 tbsp in Dough & 3 tbsp in Flan).',
        videoTutorial: 'https://youtu.be/j8al0hgWOog?si=JaaCNGLPDlDTK4Ge'
    },
    'recipe3': {
        title: 'Cassoulet (Bastien version)',
        category: 'Plat',
        image: 'https://i.pinimg.com/1200x/9f/07/dc/9f07dc5de87ab54f33678c47aeb1f099.jpg',
        description: 'Traditional French cassoulet with beans, pork, and sausage - Bastien\'s personal version.',
        servings: '4 servings',
        ingredients: [
            '1lb Pinto beans',
            '400g/1lb lard',
            '400g/1lb smoked sausage',
            '2 onions',
            '3 garlic cloves',
            'Tomato'
        ],
        cookingSteps: [
            'Soak beans overnight',
            'Brown lard, sausage, onions and garlic in a large pot',
            'Cook beans until tender (2 hours low heat)',
            'Add tomatoes and cooked beans',
            'Simmer for 30 minutes until flavors meld'
        ],
        modifications: null,
        videoTutorial: null
    },
    'recipe4': {
        title: 'Pain',
        category: 'Accompagnement',
        image: 'https://i.pinimg.com/1200x/cb/a8/4f/cba84fd2f187b4d1e54afc3beea630f8.jpg',
        description: 'Traditional French bread recipe.',
        servings: '4 servings',
        ingredients: [
            '100g + 150g Water',
            '100g + 250g Flour',
            '5g Yeast',
            '1 tsp Salt'
        ],
        cookingSteps: [
            'Mix yeast with warm water (100g) and let activate',
            'Add Flour (100g) to the yeast mixture',
            'Wait for 12 hours in the fridge',
            'Add the rest of the ingredients (150g Water, 250g Flour, 5g Yeast, 1 tsp Salt)',
            'Knead until smooth and elastic',
            'Let rise until doubled in size (12 hours in the fridge or 3 hours outside)',
            'Shape into loaf',
            'Bake at 220°C (365°F) for 20-30 minutes until golden'
        ],
        modifications: null,
        videoTutorial: null
    },
    'recipe5': {
        title: 'Crumble',
        category: 'Dessert',
        image: 'https://i.pinimg.com/1200x/c1/e3/9f/c1e39f34e02195f0e62128e8ced855f1.jpg',
        description: 'Classic fruit crumble with buttery topping.',
        servings: '4 servings',
        ingredients: [
            '75g Flour',
            '50g Sugar',
            '50g Butter',
            'Cinnamon',
            '250g Any fruit or mix of fruits'
        ],
        cookingSteps: [
            'Preheat oven to 180°C',
            'Mix flour, sugar, and cinnamon',
            'Rub in butter until crumbly',
            'Place fruit in baking dish',
            'Sprinkle crumble topping over fruit',
            'Bake for 20 minutes until golden'
        ],
        modifications: null,
        videoTutorial: null
    },
    'recipe6': {
        title: 'Tarte aux pommes',
        category: 'Dessert',
        image: 'https://i.pinimg.com/736x/f5/cc/35/f5cc357d9a09aca7296b149448cb0c57.jpg',
        description: 'Classic French apple tart with sweet pastry and apple compote.',
        servings: '8 servings',
        ingredients: [
            'Pâte sablée: 250g Flour, 100g sugar, 80g Butter, 1 egg, Cinnamon',
            'Compote de pomme: 300g Apple, Sugar, Butter',
            '700g of apple'
        ],
        cookingSteps: [
            'Make pâte sablée and line tart pan',
            'Prepare apple compote',
            'Slice remaining apples thinly',
            'Arrange apple slices in tart shell',
            'Bake for 20-30 minutes until golden'
        ],
        modifications: 'This tart recipe can be used for other fruits.',
        videoTutorial: null
    },
    'recipe7': {
        title: 'Lasagne (Bastien version)',
        category: 'Plat',
        image: 'https://i.pinimg.com/736x/b7/32/84/b732847d2b6dba5ec3f7a43199704574.jpg',
        description: 'Homemade lasagne with fresh pasta, bolognese sauce, and béchamel.',
        servings: '6 servings',
        ingredients: [
            'Pasta: 4 Egg, 400g Flour, 1 tbsp Salt',
            'Bolognese sauce: 700g Ground beef, carrots, celery, 2 Onions, 4 Garlic cloves, Basil, Oregano, Thyme, 1.5lb Crushed tomato',
            'Béchamel: 80g Butter, Flour, Milk, Ground Nutmeg',
            'Cheese on top'
        ],
        cookingSteps: [
            'Make fresh pasta dough and roll thin',
            'Prepare bolognese sauce by browning meat and vegetables',
            'Make béchamel sauce',
            'Layer pasta, bolognese, and béchamel',
            'Top with cheese and bake for 35-40 minutes'
        ],
        modifications: 'Add spinach to the pasta. Replace the Beef by vegetables.',
        videoTutorial: ''
    },
    'recipe8': {
        title: 'Mousse au chocolat',
        category: 'Dessert',
        image: 'https://i.pinimg.com/1200x/19/ec/c9/19ecc94381dfb9ba26028f93ea1cf407.jpg',
        description: 'Light and airy chocolate mousse.',
        servings: '6 servings',
        ingredients: [
            '200g Dark Chocolate',
            '6 Egg Yolk', 
            '20g Butter'
        ],
        cookingSteps: [
            'Melt chocolate with butter',
            'Beat egg yolks and fold into chocolate',
            'Whip egg whites until stiff peaks',
            'Gently fold egg whites into chocolate mixture',
            'Chill for at least 12 hours before serving'
        ],
        modifications: 'Add rum or Orange flower water.',
        videoTutorial: null
    },
    // French Recipes 9-20
    'recipe9': {
        title: 'Tarte aux pommes normande',
        category: 'Dessert',
        image: 'https://i.pinimg.com/736x/88/53/49/88534967321a2a641eeac2c11faeb6cd.jpg',
        description: 'Classic French apple tart from Normandy with sweet pastry and almond cream.',
        servings: '8 servings',
        ingredients: [
            'Pâte sablée: 250g Flour, 100g sugar, 80g Butter, 1 Egg, Cinnamon',
            'Garniture: 1kg Apple, 100g Sugar, 100g Almond powder, 100g Sour cream, 2 Eggs'
        ],
        cookingSteps: [
            'Prepare pâte sablée and line tart pan',
            'Mix almond powder, sugar, sour cream and eggs for the filling',
            'Peel and slice apples',
            'Dip apple slices in in almond cream',
            'Pour the mixture in the tart shell',
            'Bake for 20-30 minutes until golden'
        ],
        modifications: 'Replace apple by rhubarb',
        videoTutorial: null
    },
    'recipe10': {
        title: 'Tarte au citron meringuee',
        category: 'Patisserie',
        image: 'https://i.pinimg.com/736x/35/35/c7/3535c7ac92c74c1ff0ef2a07212df00f.jpg',
        description: 'Classic French lemon meringue tart with tangy lemon curd and fluffy meringue.',
        servings: '8 servings',
        ingredients: [
            'Pâte sablée: 250g Flour, 60g sugar, 100g Butter, 2 Egg yolk',
            'Crème citron: 4 Lemons, 3 Eggs, 1 tbs corn starch, 130g Sugar, Butter',
            'Meringue: 2 Egg white, 1/2 tbs baking soda, 80g Sugar'
        ],
        cookingSteps: [
            'Mix corn starch, sugar and eggs',
            'Heat lemon juice and add the mixture',
            'Cook until thickened then add butter',
            'Chill for a couple of hours',
            'Prepare pâte sablée and bake for 15 minutes',
            'Whip egg whites with sugar and baking soda for meringue',
            'Fill tart shell with lemon curd',
            'Top with meringue and brown with torch'
        ],
        modifications: 'For less acidity you can replace lemon by orange or grapefruit',
        videoTutorial: 'https://youtu.be/N7kY8vuCbVI?si=uNaGFatkYI6BUOnc'
    },
    'recipe11': {
        title: 'Eclair au chocolat',
        category: 'Patisserie',
        image: 'https://i.pinimg.com/736x/c7/48/ca/c748ca56eb91298662a7fea7aeb679f7.jpg',
        description: 'Classic French chocolate éclair with choux pastry, chocolate pastry cream, and chocolate glaze.',
        servings: '12 servings',
        ingredients: [
            'Pâte a choux: 125g Flour, 250g Water, 80g Salted Butter, 3 Eggs',
            'Creme patissiere: 200g Dark Chocolate, 3 tbs Sugar, 2 tbs Flour, 30 cl Milk, 2 Eggs, 50g Butter',
            'Glaçage: 100g Chocolate'
        ],
        cookingSteps: [
            'Preheat oven to 200°C (390°F)',
            'Make choux pastry by heating water and butter, then adding flour',
            'Beat in eggs one by one until smooth',
            'Pipe into éclair shapes and bake for 35-40 minutes',
            'Heat milk and chocolate',
            'Mix sugar, eggs, flour',
            'Add hot milk and chocolate',
            'Cook until thickened then add butter',
            'Chill for a couple of hours',
            'Fill cooled éclairs with pastry cream',
            'Melt chocolate and dip tops of éclairs'
        ],
        modifications: null,
        videoTutorial: 'https://youtu.be/QhutMxJPFto?si=0f3Qr9BqWhJ0qBja'
    },
    'recipe12': {
        title: 'Choux a la ganache chocolat',
        category: 'Patisserie',
        image: 'https://i.pinimg.com/1200x/7d/68/1a/7d681ad04e46662d8834a4495c32cdc3.jpg',
        description: 'French cream puffs filled with rich chocolate ganache.',
        servings: '8 servings',
        ingredients: [
            'Pâte a choux: 125g Flour, 125g Milk, 125g Water, 80g Salted Butter, 3 eggs',
            'Ganache chocolat: 40cl Light cream, 280g Dark chocolate (tablet)'
        ],
        cookingSteps: [
            'Preheat oven to 200°C (390°F)',
            'Make choux pastry by heating milk, water and butter',
            'Add flour and cook until smooth',
            'Beat in eggs one by one',
            'Pipe small rounds and bake for 35-40 minutes',
            'Make ganache by heating cream and melting chocolate',
            'Chill for a couple of hours then whip it',
            'Fill cooled choux with ganache'
        ],
        modifications: null,
        videoTutorial: 'https://youtu.be/r4-kzFRYv9M?si=l_Xnq0MoUXr0AEnW'
    },
    'recipe13': {
        title: 'Crêpes',
        category: 'Dessert',
        image: 'https://img.over-blog-kiwi.com/0/93/39/43/20200201/ob_942dd7_img-0395.jpg#width=1066&height=1600',
        description: 'Classic French thin pancakes, perfect for sweet or savory fillings.',
        servings: '2 servings',
        ingredients: [
            '1 Egg',
            '3 tbs Flour',
            '1.5 tbs Sugar',
            '~ 1/3L (12 oz) Milk',
            'Butter'
        ],
        cookingSteps: [
            'Mix egg, flour, and sugar in a bowl',
            'Gradually add milk while whisking',
            'Let batter rest for 30 minutes',
            'Heat a non-stick pan over medium heat',
            'Before each pour, wipe the pan with butter',
            'Pour a thin layer of batter and cook until golden',
            'Flip and cook the other side'
        ],
        modifications: 'Add any type of alcohol (rum, beer, anisette, ...) or Add Vanilla',
        videoTutorial: 'https://youtu.be/YbxWMDdVSPY?si=seSZzSXc9b2jfy8a'
    },
    'recipe14': {
        title: 'Gratin de choux fleur',
        category: 'Plat de résistance',
        image: 'https://i.pinimg.com/736x/0b/0c/54/0b0c54bf4e6f6525509e8e42edcc70d4.jpg',
        description: 'Creamy cauliflower gratin with cheese and béchamel sauce.',
        servings: '4 servings',
        ingredients: [
            '1 large cauliflower',
            'Béchamel sauce: Butter, flour, milk, nutmeg',
            'Grated cheese (Gruyère or Emmental)',
            'Salt and pepper'
        ],
        cookingSteps: [
            'Preheat oven to 180°C',
            'Cut cauliflower into florets and blanch',
            'Make béchamel sauce with butter, flour, and milk',
            'Season with nutmeg, salt, and pepper',
            'Arrange cauliflower in baking dish',
            'Pour béchamel over cauliflower and top with cheese',
            'Bake for 25-30 minutes until golden'
        ],
        modifications: null,
        videoTutorial: null
    },
    'recipe15': {
        title: 'Gratin dauphinois',
        category: 'Plat de résistance',
        image: 'https://i.pinimg.com/1200x/d0/27/14/d02714120bf5763f7acf270c3d0f6027.jpg',
        description: 'Traditional French potato gratin from the Dauphiné region.',
        servings: '6 servings',
        ingredients: [
            '1kg Potatoes',
            '500ml Heavy cream',
            '2 cloves Garlic',
            'Salt and pepper',
            'Butter'
        ],
        cookingSteps: [
            'Preheat oven to 180°C',
            'Peel and thinly slice potatoes',
            'Rub baking dish with garlic and butter',
            'Layer potatoes in dish, seasoning each layer',
            'Pour cream over potatoes',
            'Bake for 1 hour until golden and tender'
        ],
        modifications: null,
        videoTutorial: 'https://youtu.be/ZkDqkTT9i-k?si=yWskGm6UwVCJJO0s'
    },
    'recipe16': {
        title: 'Quiche (Bastien\'s mom recipe)',
        category: 'Plat de résistance',
        image: 'https://i.pinimg.com/1200x/95/ee/aa/95eeaa8624cbcfb1f3ff89c370198e06.jpg',
        description: 'Traditional French quiche with homemade pastry and creamy filling.',
        servings: '4 servings',
        ingredients: [
            'Pâte brisée: 300g Flour, 150g Butter, 8cl Water',
            'Garniture: Sour cream, shredded cheese, eggs, bacon'
        ],
        cookingSteps: [
            'Make pâte brisée and line tart pan',
            'Pre-bake pastry for 10 minutes',
            'Mix sour cream, eggs, and cheese',
            'Add cooked bacon to the mixture',
            'Pour filling into pastry shell',
            'Bake for 30-35 minutes until set'
        ],
        modifications: 'Add various kind of vegetables (leek) or cheese (goat cheese). Replace bacon by salmon',
        videoTutorial: null
    },
    'recipe17': {
        title: 'Galette bretonne',
        category: 'Plat de résistance',
        image: 'https://i.pinimg.com/1200x/f0/a1/f5/f0a1f5e36e30f45e56c73865b2d2760d.jpg',
        description: 'Traditional buckwheat crepe from Brittany, typically filled with savory ingredients.',
        servings: '4 servings',
        ingredients: [
            'Buckwheat flour',
            'Water',
            '1 tsp Salt',
            '1 Egg',
            'Butter for cooking'
        ],
        cookingSteps: [
            'Mix buckwheat flour with salt',
            'Add water gradually while whisking',
            'Add egg and mix until smooth',
            'Let batter rest for 2 hours',
            'Heat a crepe pan and add butter',
            'Pour batter and cook until edges lift',
            'Flip and cook the other side'
        ],
        modifications: null,
        videoTutorial: null
    },
    'recipe18': {
        title: 'Fondant au chocolat',
        category: 'Dessert',
        image: 'https://i.pinimg.com/736x/bc/b6/ea/bcb6ead7c18d95e290306e9149e5172e.jpg',
        description: 'Rich and decadent chocolate fondant with a molten center.',
        servings: '4 servings',
        ingredients: [
            '100g Dark chocolate',
            '100g Butter',
            '2 Eggs',
            '100g Sugar',
            '50g Flour'
        ],
        cookingSteps: [
            'Preheat oven to 200°C',
            'Melt chocolate and butter together',
            'Beat eggs with sugar until pale',
            'Fold in melted chocolate mixture',
            'Add flour and mix gently',
            'Pour into buttered ramekins',
            'Bake for 12-15 minutes until edges are set but center is still soft'
        ],
        modifications: null,
        videoTutorial: null
    },
    'recipe19': {
        title: 'Coulant au chocolat',
        category: 'Dessert',
        image: 'https://i.pinimg.com/736x/53/aa/a0/53aaa0053d541ee91bf5f47d9c71340b.jpg',
        description: 'Chocolate lava cake with a perfectly molten chocolate center.',
        servings: '4 servings',
        ingredients: [
            '100g dark chocolate',
            '80g butter',
            '2 eggs',
            '80g sugar',
            '35g flour'
        ],
        cookingSteps: [
            'Preheat oven to 410°F',
            'Melt chocolate and butter together',
            'Beat eggs with sugar until fluffy',
            'Fold in chocolate mixture',
            'Add flour and mix gently',
            'Pour into buttered ramekins',
            'Bake for 15 minutes until edges are set'
        ],
        modifications: null,
        videoTutorial: 'https://youtu.be/x5VJzLhhJtQ?si=qTVD_5NF4e4CTVLr'
    },
    'recipe20': {
        title: 'Mouelleux au chocolat - Muffin',
        category: 'Dessert',
        image: 'https://i.pinimg.com/1200x/34/94/c2/3494c2b1572fe41c357aa5672609574e.jpg',
        description: 'Soft chocolate muffins with chocolate chips and Nutella filling.',
        servings: '12 servings',
        ingredients: [
            '200g Chocolate tablet',
            '120g Butter',
            '120g Flour',
            '100g sugar',
            '50g Nut/almond flour',
            '3 eggs',
            '1.5dl Milk',
            '2cs Baking soda',
            'Chocolate chips',
            '100g Nutella',
            '100g Chocolate'
        ],
        cookingSteps: [
            'Preheat oven to 370°F',
            'Melt chocolate and butter together',
            'Beat eggs with sugar until pale',
            'Mix in melted chocolate',
            'Add flour, nut flour, and baking soda',
            'Stir in milk and chocolate chips',
            'Fill muffin cups halfway, add Nutella, then more batter',
            'Bake for 30 minutes'
        ],
        modifications: null,
        videoTutorial: null
    },
    'recipe21': {
        title: 'Muffin nature',
        category: 'Dessert',
        image: 'https://i.pinimg.com/736x/80/5c/76/805c76048debe29b7326c8684a9cd320.jpg',
        description: 'Classic plain muffins with chocolate chips.',
        servings: '12 servings',
        ingredients: [
            '300g Flour',
            '150g Sugar',
            '2 Eggs',
            '150ml Milk',
            '100g Butter',
            '2 cs Baking soda',
            '100g-200g Chocolate chips'
        ],
        cookingSteps: [
            'Preheat oven to 180°C',
            'Mix flour, sugar, and baking soda',
            'Melt butter and let cool',
            'Beat eggs with milk',
            'Combine wet and dry ingredients',
            'Fold in chocolate chips',
            'Fill muffin cups and bake for 20-25 minutes'
        ],
        modifications: null,
        videoTutorial: null
    },
    'recipe22': {
        title: 'Brioche',
        category: 'Vienoiserie',
        image: 'https://i.pinimg.com/1200x/9c/19/6c/9c196c5496cc3b541811a5bd0e29dee5.jpg',
        description: 'Rich and buttery French brioche bread.',
        servings: '6 servings',
        ingredients: [
            '10g Dry yeast',
            '500g Flour',
            '100g Sugar',
            '2 Eggs',
            '20cl Milk',
            '80g Butter'
        ],
        cookingSteps: [
            'Activate yeast in warm milk',
            'Mix flour, sugar, and eggs',
            'Add yeast mixture and knead',
            'Incorporate butter gradually',
            'Let rise 12 to 24 hours in the fridge',
            'Shape and let rise 4h outside',
            'Bake: Small 15min (365°F), Big 25-30min (365°F)'
        ],
        modifications: 'Add dry fruits, Chocolate chips or sugar pearl. Brush with sturb egg or butter for a nice golden top',
        videoTutorial: null
    },
    'recipe23': {
        title: 'Flamenkuche',
        category: 'Plat de résistance',
        image: 'https://i.pinimg.com/1200x/23/85/24/238524e32c6978f75814730369ae1d59.jpg',
        description: 'Traditional Alsatian thin-crust pizza with crème fraîche, onions, and bacon.',
        servings: '4 servings',
        ingredients: [
            'Pizza dough: Flour, water, yeast, salt',
            'Crème fraîche',
            'Onions',
            'Bacon or lardons',
            'Salt and pepper'
        ],
        cookingSteps: [
            'Make thin pizza dough',
            'Roll out very thinly',
            'Spread crème fraîche on dough',
            'Add thinly sliced onions',
            'Top with bacon pieces',
            'Season with salt and pepper',
            'Bake at high temperature until crispy'
        ],
        modifications: null,
        videoTutorial: null
    },
    'recipe24': {
        title: 'Endive au jambon',
        category: 'Plat de résistance',
        image: 'https://recettedelicieux.com/wp-content/uploads/2025/07/Untitled-design-2025-07-01T160301.500.jpg',
        description: 'Belgian endives wrapped in ham and covered with béchamel sauce.',
        servings: '4 servings',
        ingredients: [
            '8 Belgian endives',
            '8 slices of ham',
            'Béchamel sauce: Butter, flour, milk',
            'Grated cheese',
            'Salt and pepper'
        ],
        cookingSteps: [
            'Preheat oven to 180°C',
            'Blanch endives in salted water',
            'Wrap each endive in a slice of ham',
            'Make béchamel sauce',
            'Arrange wrapped endives in baking dish',
            'Pour béchamel over and top with cheese',
            'Bake for 20-25 minutes until golden'
        ],
        modifications: 'Replace Endives by Leek or Macedoine (carrots, peas, beans, potatoes and onions)',
        videoTutorial: null
    },
    'recipe25': {
        title: 'crème brûlée',
        category: 'Dessert',
        image: '',
        description: 'Classic French crème brûlée with a caramelized sugar topping.',
        servings: '4 servings',
        ingredients: [
            '4 Egg yolks',
            'Cream',
            'Sugar',
            'Vanilla extract',
            'Milk',
            'Cane sugar'
        ],
        cookingSteps: [
            'Preheat oven to 180°C',
            'Mix egg yolks and sugar',
            'Add vanilla extract and milk',
            'Pour into ramekins',
            'Bake for 20 minutes',
            'Caramelize the sugar on top',
            'Serve with a scoop of vanilla ice cream'
        ],
        modifications: null,
        videoTutorial: 'https://www.youtube.com/watch?v=lROX8gJ8SPE'
    },
    'recipe26': {
        title: 'Boeuf bourgignon',
        category: 'Plat de résistance',
        image: 'https://i.pinimg.com/1200x/e5/42/40/e5424041754f4e33471f7bad7b284a7e.jpg',
        description: 'Classic French beef stew braised in red wine with vegetables.',
        servings: '6 servings',
        ingredients: [
            '1.5kg Beef chuck, cubed',
            '750ml Red wine (Burgundy)',
            '200g Bacon, diced',
            '2 Onions',
            '3 Carrots',
            '250g Mushrooms',
            '2 cloves Garlic',
            'Bouquet garni (thyme, bay leaf, parsley)',
            'Flour for dusting'
        ],
        cookingSteps: [
            'Dust beef cubes with flour',
            'Brown beef and bacon in batches',
            'Add onions and carrots, cook until softened',
            'Add wine and bouquet garni',
            'Simmer for 2-3 hours until meat is tender',
            'Add mushrooms in the last 30 minutes',
            'Season and serve hot'
        ],
        modifications: null,
        videoTutorial: 'https://youtu.be/F_53yUD3Je4?si=2MDveCoIGMiit-IL'
    },
    'recipe27': {
        title: 'Potée',
        category: 'Plat de résistance',
        image: 'https://i.pinimg.com/1200x/c9/10/35/c91035ce103cc962d9b41e28cd61f59e.jpg',
        description: 'Traditional French country stew with pork, cabbage, and root vegetables.',
        servings: '6 servings',
        ingredients: [
            '500g Pork shoulder',
            '200g Smoked sausage',
            '1 small cabbage',
            '4 Potatoes',
            '3 Carrots',
            '2 Turnips',
            '1 Onion',
            'Bouquet garni',
            'Salt and pepper'
        ],
        cookingSteps: [
            'Cut pork into large pieces',
            'Place pork in large pot with water and bouquet garni',
            'Simmer for 1 hour',
            'Add vegetables and sausage',
            'Continue cooking for 45 minutes',
            'Season and serve hot'
        ],
        modifications: null,
        videoTutorial: 'https://youtu.be/n2ZbbbkAVhE?si=myt2Ia3YiXgu0j6I'
    },
    'recipe28': {
        title: 'Pot au feu',
        category: 'Plat de résistance',
        image: 'https://recettedelicieux.com/wp-content/uploads/2025/08/Untitled-design-2025-08-23T144729.299-530x530.jpg',       description: 'Traditional French boiled dinner with beef and vegetables.',
        servings: '6 servings',
        ingredients: [
            '1kg Beef (shin, brisket)',
            '4 Carrots',
            '4 Leeks',
            '4 Potatoes',
            '1 Cabbage',
            '2 Onions',
            'Bouquet garni',
            'Salt and pepper'
        ],
        cookingSteps: [
            'Place beef in large pot with cold water',
            'Add bouquet garni and bring to boil',
            'Skim foam and simmer for 2 hours',
            'Add vegetables in order of cooking time',
            'Continue cooking until vegetables are tender',
            'Season and serve with broth'
        ],
        modifications: null,
        videoTutorial: null
    },
    'recipe29': {
        title: 'Poulet rôti',
        category: 'Plat de résistance',
        image: 'https://i.pinimg.com/736x/a4/07/d5/a407d54dcc1d2145c06b7d42cef93ade.jpg',
        description: 'Classic French roast chicken with potatoes and seasonal accompaniments.',
        servings: '4 servings',
        ingredients: [
            '1 Whole chicken',
            '2-3 lb Potato',
            '1-2 Onion',
            '8 oz Prune',
            '8 oz Chestnut'
        ],
        cookingSteps: [
            'Preheat oven to 200°C',
            'Season chicken inside and out',
            'Peel and quarter potatoes',
            'Arrange chicken and vegetables in roasting pan',
            'Add prunes and chestnuts around chicken',
            'Roast for 2 hours, basting occasionally',
            'Let rest 15 minutes before carving'
        ],
        modifications: 'Add Ground pork or Add Herbs',
        videoTutorial: null
    },
    'recipe30': {
        title: 'Saussice-Lentille',
        category: 'Plat de résistance',
        image: 'https://i.pinimg.com/736x/fd/44/47/fd444787cc968a69d631a5c26e1e6497.jpg',
        description: 'French sausage and lentil stew, a hearty winter dish.',
        servings: '4 servings',
        ingredients: [
            '400g Green lentils',
            '4 sausages (Smoked or not)',
            '2 Carrots',
            '2 Onions',
            '2 cloves Garlic',
            'Bouquet garni',
            'Salt and pepper'
        ],
        cookingSteps: [
            'Soak lentils for 1 hour',
            'Brown sausages in a large pot',
            'Add onions, carrots, and garlic',
            'Add lentils and bouquet garni',
            'Cover with water and simmer for 45 minutes',
            'Season and serve hot'
        ],
        modifications: null,
        videoTutorial: null
    },
    'recipe31': {
        title: 'Rougaille saucisse',
        category: 'Plat de résistance',
        image: 'https://i.pinimg.com/1200x/61/54/95/615495d4103daf84f2950442abcb6e06.jpg',
        description: 'Creole sausage stew with tomatoes and spices from Réunion Island.',
        servings: '4 servings',
        ingredients: [
            '2 Onions',
            '4 Garlic gloves',
            '4 Tomatoes',
            '2 Smoked sausages',
            '1/2 lb Lard',
            'Ginger',
            'Tomato sauce',
            'Laurel',
            'Thyme',
            'Curcuma'
        ],
        cookingSteps: [
            'Cut sausages and lard into pieces',
            'Brown meat in a large pot',
            'Add onions and garlic, cook until softened',
            'Add tomatoes and spices',
            'Simmer for 30 minutes',
            'Season and serve with rice'
        ],
        modifications: null,
        videoTutorial: 'https://youtu.be/fnNru4H8GAk?si=777mGZcqGPYniLv0'
    },
    'recipe32': {
        title: 'Blanquette de veau',
        category: 'Plat de résistance',
        image: 'https://i.pinimg.com/1200x/05/27/00/052700ca937a1531aa4b9a8db81cdb76.jpg',
        description: 'Classic French veal stew in white sauce, usually served with rice.',
        servings: '6 servings',
        ingredients: [
            'Bouillon: 1 Leek, 2lb Carrot, 2 Onions, 3 Garlic gloves, 2lb Veal, Laurel, Thyme',
            'Sauce: 100g Butter, Flour, Water from Bouillon, Bouillon concentrated',
            '1lb Mushrooms',
            'Rice (side dish)'
        ],
        cookingSteps: [
            'Make bouillon: simmer veal with vegetables and herbs for 1h30-2h',
            'Strain and reserve cooking liquid',
            'Make white sauce with butter, flour, and bouillon',
            'Add cooked veal and mushrooms to sauce',
            'The mix of everything: 10min in the pot (just reheat)',
            'Serve hot with rice'
        ],
        modifications: 'Replace Veal by any white meat (Chicken, Pork, ...)',
        videoTutorial: 'https://youtu.be/xn1BTnRmEb8?si=AvFQvPb5FknbnTI_'
    },
    'recipe33': {
        title: 'Hachis parmentier',
        category: 'Plat de résistance',
        image: 'https://i.pinimg.com/736x/89/9b/f0/899bf080a4c7aaf713d5405874b0d4c5.jpg',
        description: 'French shepherd\'s pie with ground meat and mashed potatoes.',
        servings: '6 servings',
        ingredients: [
            '500g Ground beef',
            '1kg Potatoes',
            '2 Onions',
            '2 cloves Garlic',
            'Butter and milk for mashed potatoes',
            'Grated cheese',
            'Salt and pepper'
        ],
        cookingSteps: [
            'Brown ground beef with onions and garlic',
            'Season and set aside',
            'Boil potatoes until tender',
            'Mash potatoes with butter and milk',
            'Layer meat in baking dish',
            'Top with mashed potatoes and cheese',
            'Bake until golden brown'
        ],
        modifications: null,
        videoTutorial: null
    },
    'recipe34': {
        title: 'Riz cantonnais à la française',
        category: 'Plat de résistance',
        image: 'https://i.pinimg.com/1200x/90/fc/67/90fc6789a5e839db5191ebbcf91521fb.jpg',
        description: 'French-style Cantonese fried rice with vegetables and meat.',
        servings: '4 servings',
        ingredients: [
            '300g Cooked rice',
            '200g Mixed vegetables (peas, carrots, corn)',
            '150g Cooked meat (chicken, pork, or shrimp)',
            '2 Eggs',
            '2 cloves Garlic',
            'Soy sauce',
            'Vegetable oil',
            'Salt and pepper'
        ],
        cookingSteps: [
            'Heat oil in a large wok or pan',
            'Scramble eggs and set aside',
            'Sauté garlic and vegetables',
            'Add meat and cooked rice',
            'Stir-fry until heated through',
            'Add scrambled eggs and soy sauce',
            'Season and serve hot'
        ],
        modifications: null,
        videoTutorial: null
    },
    'recipe35': {
        title: 'Sauté de porc',
        category: 'Plat de résistance',
        image: 'https://i.pinimg.com/1200x/b9/4c/94/b94c946be37ee34660915501119ac30a.jpg',
        description: 'French pork stir-fry with vegetables and herbs.',
        servings: '4 servings',
        ingredients: [
            '600g Pork tenderloin, cubed',
            '2 Bell peppers',
            '2 Onions',
            '200g Mushrooms',
            '2 cloves Garlic',
            'Fresh herbs (thyme, rosemary)',
            'White wine',
            'Olive oil',
            'Salt and pepper'
        ],
        cookingSteps: [
            'Season pork cubes with salt and pepper',
            'Heat oil in a large pan',
            'Brown pork on all sides',
            'Add onions and garlic, cook until softened',
            'Add vegetables and herbs',
            'Deglaze with white wine',
            'Simmer until pork is cooked through'
        ],
        modifications: null,
        videoTutorial: null
    },
    'recipe36': {
        title: 'Chouquettes',
        category: 'Dessert',
        image: 'https://i.pinimg.com/736x/5b/60/cc/5b60cc976dc723e0ba08392842919dcf.jpg',
        description: 'Light and airy French choux pastry puffs with pearl sugar.',
        servings: '20 servings',
        ingredients: [
            '125g Flour',
            '250ml Water',
            '80g Butter',
            '3 Eggs',
            'Pearl sugar'
        ],
        cookingSteps: [
            'Preheat oven to 200°C',
            'Heat water, butter, and salt until boiling',
            'Add flour and stir until smooth',
            'Beat in eggs one by one',
            'Pipe small rounds onto baking sheet',
            'Sprinkle with pearl sugar',
            'Bake for 20-25 minutes until golden'
        ],
        modifications: null,
        videoTutorial: null
    },
    'recipe37': {
        title: 'Charlotte aux amandes',
        category: 'Dessert',
        image: 'https://cache.marieclaire.fr/data/photo/w1000_c17/cuisine/43/cremeamandes.webp',
        description: 'Elegant French dessert with ladyfingers, almond cream, and chocolate.',
        servings: '8 servings',
        ingredients: [
            'Biscuit: 180g sugar, 120g flour, 6 eggs',
            'Cream: 3 eggs, 200g Sugar, 200g Butter, 250g Almond powder, 10cl Light Cream',
            'Liquid chocolate: 200g Dark chocolate (tablet), 20cl Milk'
        ],
        cookingSteps: [
            'Make sponge cake and cut into strips',
            'Dip ladyfingers in coffee and/or rum',
            'Line a charlotte mold with ladyfingers',
            'Make almond cream with eggs, sugar, butter, and almond powder',
            'Fill mold with cream and sponge strips',
            'Chill for several hours',
            'Make chocolate sauce and serve'
        ],
        modifications: null,
        videoTutorial: null
    },
    'recipe38': {
        title: 'Ratatouille',
        category: 'Plat de résistance',
        image: 'https://i.pinimg.com/1200x/03/e4/63/03e463cd1177ff644b2c42b91b1c43a5.jpg',
        description: 'Traditional Provençal vegetable stew with zucchini, eggplant, and tomatoes.',
        servings: '6 servings',
        ingredients: [
            'Zucchini / Squash',
            'Eggplant',
            'Tomato',
            'Onion',
            'Garlic',
            'Olive oil',
            'Fresh herbs (thyme, basil)',
            'Salt and pepper'
        ],
        cookingSteps: [
            'Cut all vegetables into similar-sized pieces',
            'Heat olive oil in a large pot',
            'Sauté onions and garlic until softened',
            'Add eggplant and cook until tender',
            'Add zucchini and tomatoes',
            'Season with herbs, salt, and pepper',
            'Simmer for 30-45 minutes until vegetables are tender'
        ],
        modifications: 'Add chicken or pork to do a stew',
        videoTutorial: null
    },
    'recipe39': {
        title: 'Tiramisu (classic)',
        category: 'Dessert',
        image: 'https://i.pinimg.com/1200x/ca/48/22/ca4822de7bad9a3e58e9dea6fd6da8ca.jpg',
        description: 'Classic Italian dessert with coffee-soaked ladyfingers and mascarpone cream.',
        servings: '8 servings',
        ingredients: [
            'Biscuit: 180g sugar, 120g flour, 6 eggs',
            'Cream: 500g Mascarpone, 5 eggs, 170g Sugar, vanilla',
            'Strong coffee',
            'Amaretto (optional)',
            'Cocoa powder'
        ],
        cookingSteps: [
            'Make sponge cake and cut into strips',
            'Biscuit: 25 min at 300°F',
            'Make mascarpone cream with eggs and sugar',
            'Dip biscuit in coffee (+amaretto)',
            'Layer biscuits and cream in serving dish',
            'Chill for 36 hours',
            'Before serving spread cocoa powder on top'
        ],
        modifications: 'You can replace mascarpone by cream cheese/Philadelphia',
        videoTutorial: null
    },
    'recipe40': {
        title: 'Orange Tiramisu',
        category: 'Dessert',
        image: 'https://i.pinimg.com/1200x/61/a5/02/61a502daa417299804eae3d5f99526af.jpg',
        description: 'Orange-flavored tiramisu',
        servings: '4 servings',
        ingredients: [
            'Biscuit: 90g sugar, 60g flour, 3 eggs',
            'Cream: 250g Mascarpone, 3 eggs, 85g Sugar',
            'Fresh orange juice',
            'Rum (optional)'
        ],
        cookingSteps: [
            'Make sponge cake and cut into strips',
            'Biscuit: 25 min at 300°F',
            'Make mascarpone cream',
            'Dip biscuit in fresh orange juice (+ rum)',
            'Layer biscuits, cream',
            'Chill for 36 hours'
        ],
        modifications: 'Add a peach or apricot coulis, Can be adapted to any fruit',
        videoTutorial: null
    },
    'recipe41': {
        title: 'Gougères',
        category: 'Appetizer',
        image: 'https://i.pinimg.com/1200x/b5/15/b4/b515b428d6ec7e93080471dbca60ea1d.jpg',
        description: 'Cheesy French choux pastry puffs, perfect as appetizers.',
        servings: '20 servings',
        ingredients: [
            '125g Flour',
            '250ml Water',
            '80g Butter',
            '3 Eggs',
            '100g Gruyère cheese, grated',
            'Pinch of salt and nutmeg'
        ],
        cookingSteps: [
            'Preheat oven to 200°C',
            'Heat water, butter, and salt until boiling',
            'Add flour and stir until smooth',
            'Beat in eggs one by one',
            'Fold in grated cheese',
            'Pipe small rounds onto baking sheet',
            'Bake for 20-25 minutes until golden and puffed'
        ],
        modifications: null,
        videoTutorial: null
    },
    'recipe42': {
        title: 'Crème Anglaise',
        category: 'Accompagnement Dessert',
        image: 'https://i.pinimg.com/736x/5e/d6/95/5ed695c897da2fa180238f308864fdc1.jpg',
        description: 'Classic French custard sauce, perfect accompaniment for desserts.',
        servings: '6 servings',
        ingredients: [
            '500ml Milk',
            '4 Egg yolks',
            '100g Sugar',
            '1 Vanilla bean or vanilla extract'
        ],
        cookingSteps: [
            'Heat milk with vanilla until just boiling',
            'Beat egg yolks with sugar until pale',
            'Gradually pour hot milk over egg mixture, whisking constantly',
            'Return to heat and cook gently, stirring constantly',
            'Cook until thickened and coats the back of a spoon',
            'Strain and cool'
        ],
        modifications: null,
        videoTutorial: 'https://www.youtube.com/watch?v=9tdTWVzyRhQ'
    },
    'recipe43': {
        title: 'Tomates Farcies',
        category: 'Plat de résistance',
        image: 'https://i.pinimg.com/1200x/62/7d/33/627d33fa90092b60346c233e4f6f7cfd.jpg',
        description: 'Traditional French stuffed tomatoes with meat and herbs.',
        servings: '6 servings',
        ingredients: [
            '6 large tomatoes',
            '300g Ground meat (beef, pork, or veal)',
            '1 Onion',
            '2 cloves Garlic',
            'Fresh herbs (thyme, parsley)',
            'Breadcrumbs',
            'Olive oil',
            'Salt and pepper'
        ],
        cookingSteps: [
            'Preheat oven to 180°C',
            'Cut tops off tomatoes and scoop out flesh',
            'Sauté onion and garlic until softened',
            'Mix with ground meat, herbs, and breadcrumbs',
            'Season and stuff tomatoes',
            'Place in baking dish and drizzle with olive oil',
            'Bake for 45 minutes until tender'
        ],
        modifications: 'Replace tomatoes by Zucchini',
        videoTutorial: null
    },
    'recipe44': {
        title: 'Riz au lait',
        category: 'Dessert',
        image: 'https://i.pinimg.com/1200x/49/d7/68/49d7681beccca5bd0e51450d24b41f5b.jpg',
        description: 'Classic French rice pudding, creamy and comforting.',
        servings: '6 servings',
        ingredients: [
            '200g Short-grain rice',
            '1L Milk',
            '100g Sugar',
            '1 Vanilla bean',
            'Cinnamon (optional)'
        ],
        cookingSteps: [
            'Rinse rice until water runs clear',
            'Heat milk with vanilla bean until just boiling',
            'Add rice and simmer gently, stirring frequently',
            'Cook for 30-40 minutes until rice is tender',
            'Add sugar and stir until dissolved',
            'Remove vanilla bean and serve warm or cold'
        ],
        modifications: null,
        videoTutorial: null
    },
    'recipe45': {
        title: 'Quatre-Quart',
        category: 'Dessert',
        image: 'https://i.pinimg.com/1200x/2e/71/d4/2e71d409d6f9cee2254d94898c132095.jpg',
        description: 'Classic French pound cake with equal parts of four ingredients.',
        servings: '8 servings',
        ingredients: [
            '250g Butter',
            '250g Flour',
            '250g Sugar',
            '250g Eggs (~3)',
            '1 csp Baking soda'
        ],
        cookingSteps: [
            'Preheat oven to 360°F',
            'Cream butter and sugar until light and fluffy',
            'Beat in eggs one at a time',
            'Fold in flour and baking soda',
            'Pour into buttered loaf pan',
            'Bake for 45 minutes until golden and cooked through'
        ],
        modifications: null,
        videoTutorial: null
    },
    'recipe46': {
        title: 'Marbré chocolat',
        category: 'Dessert',
        image: 'https://i.pinimg.com/1200x/cd/e8/64/cde864d32ff3f671eeddb80de3608df9.jpg',
        description: 'French marbled cake with vanilla and chocolate swirls.',
        servings: '8 servings',
        ingredients: [
            '250g Butter',
            '250g Sugar',
            '4 Eggs',
            '250g Flour',
            '2 tsp Baking powder',
            'Vanilla extract',
            'Cocoa powder'
        ],
        cookingSteps: [
            'Preheat oven to 180°C',
            'Cream butter and sugar',
            'Beat in eggs one at a time',
            'Fold in flour and baking powder',
            'Divide batter in half',
            'Add vanilla to one half, cocoa to the other',
            'Alternate spoonfuls in loaf pan and swirl',
            'Bake for 45-50 minutes'
        ],
        modifications: null,
        videoTutorial: null
    },
    'recipe47': {
        title: 'Poulet basquaise',
        category: 'Plat de résistance',
        image: 'https://i.pinimg.com/1200x/de/b4/32/deb432a03b24dc505f549334cb2c615f.jpg',
        description: 'Basque-style chicken with peppers, tomatoes, and Espelette pepper.',
        servings: '6 servings',
        ingredients: [
            '1 whole chicken, cut into pieces',
            '2 Red bell peppers',
            '2 Green bell peppers',
            '4 Tomatoes',
            '2 Onions',
            '3 cloves Garlic',
            'Espelette pepper or paprika',
            'White wine',
            'Olive oil',
            'Salt and pepper'
        ],
        cookingSteps: [
            'Season chicken pieces with salt and pepper',
            'Brown chicken in olive oil',
            'Add onions and garlic, cook until softened',
            'Add peppers and tomatoes',
            'Season with Espelette pepper',
            'Add white wine and simmer for 45 minutes',
            'Serve hot with rice or potatoes'
        ],
        modifications: null,
        videoTutorial: null
    },
    'recipe48': {
        title: 'Gâteau au citron',
        category: 'Dessert',
        image: 'https://i.pinimg.com/1200x/45/99/38/4599380cc434b8ac53965f175661e1e0.jpg',
        description: 'Moist and tangy French lemon cake.',
        servings: '8 servings',
        ingredients: [
            '350g Flour',
            '250g Sugar',
            '250g Butter',
            '4 Eggs',
            '1 tbls. Baking soda',
            '2 Lemons (juice and zest)'
        ],
        cookingSteps: [
            'Preheat oven to 330°F',
            'Cream butter and sugar until light',
            'Beat in eggs one at a time',
            'Add lemon zest and juice',
            'Fold in flour and baking soda',
            'Pour into buttered cake pan',
            'Bake for 1 hour until golden and cooked through'
        ],
        modifications: null,
        videoTutorial: null
    },
    'recipe49': {
        title: 'Cookies',
        category: 'Dessert',
        image: 'https://recettedelicieux.com/wp-content/uploads/2025/05/Untitled-design-2025-05-25T012941.619.jpg',
        description: 'Classic chocolate chip cookies, soft and chewy.',
        servings: '4 servings',
        ingredients: [
            '1 egg',
            '85g butter',
            '85g sugar',
            '150g flour',
            'Chocolate chips',
            'Vanilla extract',
            'Baking soda'
        ],
        cookingSteps: [
            'Preheat oven to 360°F',
            'Cream butter and sugar',
            'Beat in egg and vanilla',
            'Mix in flour and baking soda',
            'Fold in chocolate chips',
            'Drop spoonfuls onto baking sheet',
            'Bake for 15 minutes until golden'
        ],
        modifications: null,
        videoTutorial: null
    },
    'recipe50': {
        title: 'Sablé de Noël',
        category: 'Dessert',
        image: 'https://i.pinimg.com/1200x/75/45/7d/75457da6a6bb53a1a98e0802b3d827a2.jpg',
        description: 'Traditional French Christmas shortbread cookies with cinnamon.',
        servings: '20 servings',
        ingredients: [
            '250g Flour',
            '100g sugar',
            '80g Butter',
            '1 Egg',
            'Cinnamon'
        ],
        cookingSteps: [
            'Preheat oven to 360°F',
            'Mix flour, sugar, and cinnamon',
            'Cut in butter until crumbly',
            'Beat in egg until dough forms',
            'Roll out and cut into shapes',
            'Bake for 10 minutes until lightly golden'
        ],
        modifications: null,
        videoTutorial: null
    },
    'recipe51': {
        title: 'Galette des rois',
        category: 'Dessert',
        image: 'https://i.pinimg.com/1200x/be/e3/4a/bee34a5efaaef90a3d7e5cdcddbd9484.jpg',
        description: 'Traditional French King\'s Cake for Epiphany, with puff pastry and frangipane.',
        servings: '8 servings',
        ingredients: [
            '2 sheets Puff pastry',
            'Frangipane: 100g Butter, 100g Sugar, 2 Eggs, 100g Almond flour',
            '1 fève (small ceramic figure)',
            'Egg wash'
        ],
        cookingSteps: [
            'Preheat oven to 200°C',
            'Make frangipane by creaming butter and sugar',
            'Beat in eggs and almond flour',
            'Roll out puff pastry and cut into circles',
            'Spread frangipane on one circle',
            'Hide fève in the filling',
            'Cover with second circle and seal edges',
            'Brush with egg wash and score pattern',
            'Bake for 25-30 minutes until golden'
        ],
        modifications: null,
        videoTutorial: null
    }
};

// Function to generate HTML for ingredients with proper grouping
function generateIngredientsHTML(ingredients) {
    // Check if any ingredient has a colon followed by ingredients (indicating multiple elements)
    // More specific check: look for patterns like "Element Name: ingredient1, ingredient2"
    const hasMultipleElements = ingredients.some(ingredient => {
        const colonIndex = ingredient.indexOf(':');
        if (colonIndex === -1) return false;
        
        // Check if there are ingredients after the colon (not just a colon at the end)
        const afterColon = ingredient.substring(colonIndex + 1).trim();
        return afterColon.length > 0 && (afterColon.includes(',') || afterColon.length > 10);
    });
    
    if (!hasMultipleElements) {
        // Single element - display as simple list with blue box styling
        return `
            <div class="ingredient-element">
                <ul class="ingredients-list">
                    ${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
                </ul>
            </div>
        `;
    } else {
        // Multiple elements - group by element name
        let html = '';
        let hasStandaloneIngredients = false;
        
        ingredients.forEach(ingredient => {
            const colonIndex = ingredient.indexOf(':');
            const afterColon = ingredient.substring(colonIndex + 1).trim();
            
            // Check if this is a grouped ingredient (has colon with ingredients after it)
            if (colonIndex !== -1 && afterColon.length > 0 && (afterColon.includes(',') || afterColon.length > 10)) {
                // This ingredient has an element name (e.g., "Pâte brisée: 300g Flour, 150g Butter")
                const elementName = ingredient.substring(0, colonIndex).trim();
                const elementIngredients = afterColon;
                
                // Split ingredients by comma and clean them
                const ingredientList = elementIngredients.split(',').map(ing => ing.trim()).filter(ing => ing);
                
                html += `
                    <div class="ingredient-element">
                        <h4 class="element-name">${elementName}</h4>
                        <ul class="ingredients-list">
                            ${ingredientList.map(ing => `<li>${ing}</li>`).join('')}
                        </ul>
                    </div>
                `;
            } else {
                // This is a standalone ingredient (no element name or just a colon without ingredients)
                if (!hasStandaloneIngredients) {
                    // Start standalone section
                    html += '<div class="ingredient-element"><h4 class="element-name">Additional Ingredients</h4><ul class="ingredients-list">';
                    hasStandaloneIngredients = true;
                }
                html += `<li>${ingredient}</li>`;
            }
        });
        
        // Close the standalone section if it was opened
        if (hasStandaloneIngredients) {
            html += '</ul></div>';
        }
        
        return html;
    }
}

function openModal(modalId) {
    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modal-body');
    const data = modalData[modalId];

    if (data) {
        let modalContent = `
            <h2>${data.title}</h2>
        `;
        
        // Add category if it exists
        if (data.category) {
            modalContent += `<p class="modal-category">${data.category}</p>`;
        }
        
        // Add company name for experience modals (after title)
        if (modalId.startsWith('exp') && data.company) {
            modalContent += `<p class="modal-company">${data.company}</p>`;
        }
        
        // Add period for experience modals (after company)
        if (modalId.startsWith('exp') && data.datePeriod) {
            modalContent += `<p class="modal-date-period">${data.datePeriod}</p>`;
        }
        
        // Add image if it exists
        if (data.image) {
            modalContent += `<img src="${data.image}" alt="${data.title}">`;
        }
        
        // Add description if it exists
        if (data.description) {
            modalContent += `<p class="modal-description">${data.description}</p>`;
        }
        
        // Add servings if it exists
        if (data.servings) {
            modalContent += `<div class="modal-section"><p>${data.servings}</p></div>`;
        }
        
        // Add ingredients if they exist
        if (data.ingredients && data.ingredients.length > 0) {
            modalContent += `
                <div class="modal-section">
                    <h3>Ingredients</h3>
                    ${generateIngredientsHTML(data.ingredients)}
                </div>
            `;
        }
        
        // Add modifications if they exist (moved right after ingredients)
        if (data.modifications) {
            modalContent += `
                <div class="modal-section modifications-section">
                    <h4 class="modifications-title">Modifications & Variations</h4>
                    <p class="modifications-content">${data.modifications}</p>
                </div>
            `;
        }
        
        // Add cooking steps if they exist
        if (data.cookingSteps && data.cookingSteps.length > 0) {
            modalContent += `
                <div class="modal-section">
                    <h3>Cooking Steps</h3>
                    <ol class="cooking-steps">
                        ${data.cookingSteps.map(step => `<li>${step}</li>`).join('')}
                    </ol>
                </div>
            `;
        }
        
        // Add video tutorial if it exists
        if (data.videoTutorial) {
            modalContent += `
                <div class="modal-section">
                    <h3>Video Tutorial</h3>
                    <a href="${data.videoTutorial}" target="_blank" class="video-link">
                        <i class="fas fa-play-circle"></i> Watch Video Tutorial
                    </a>
                </div>
            `;
        }
        
        // Handle project modals with new structure
        if (modalId.startsWith('project') && data.activities) {
            // Add activities with images and descriptions (for project2, project3)
            if (data.activities && data.activities.length > 0) {
                data.activities.forEach((activity, index) => {
                    modalContent += `
                        <div class="project-activity">
                            ${activity.image && activity.image.trim() !== '' ? `<img src="${activity.image}" alt="Activity ${index + 1}">` : ''}
                            <p class="activity-description">${activity.description}</p>
                        </div>
                    `;
                });
            }
            
            // Add "What to explore next" section for project2 and project3
            if ((modalId === 'project2' || modalId === 'project3') && data.exploreNext) {
                modalContent += `
                    <div class="project-section explore-next-section">
                        <h3>What to Explore Next</h3>
                        <ul class="explore-next-list">
                            ${data.exploreNext.map(item => `<li class="explore-next-item">${item}</li>`).join('')}
                        </ul>
                    </div>
                `;
            }
        }
        // Handle project1 (Personal Website) and project4 (Business Operations Webapp) with purpose and roadmap structure
        else if ((modalId === 'project1' || modalId === 'project4') && data.purpose && data.roadmap) {
            // Add purpose section
            modalContent += `
                <div class="project-section">
                    <h3>Purpose</h3>
                    <p class="project-purpose">${data.purpose}</p>
                </div>
            `;
            
            // Add roadmap section
            modalContent += `
                <div class="project-section">
                    <h3>Roadmap</h3>
                    <div class="roadmap-container">
                        <div class="roadmap-section">
                            <h4 class="roadmap-title achieved">Achieved</h4>
                            <ul class="roadmap-list">
                                ${data.roadmap.achieved.map(item => `<li class="roadmap-item achieved">${item}</li>`).join('')}
                            </ul>
                        </div>
                        <div class="roadmap-section">
                            <h4 class="roadmap-title next">Next Steps</h4>
                            <ul class="roadmap-list">
                                ${data.roadmap.next.map(item => `<li class="roadmap-item next">${item}</li>`).join('')}
                            </ul>
                        </div>
                    </div>
                </div>
            `;
        }
        // Handle education modals with new structure
        else if (modalId.startsWith('edu') && data.coursework) {
            // Add date/period without title
            if (data.datePeriod) {
                modalContent += `<p class="modal-date-period">${data.datePeriod}</p>`;
            }
            
            // Add coursework if it exists
            if (data.coursework && data.coursework.length > 0) {
                modalContent += `
                    <div class="modal-section">
                        <h3>Coursework</h3>
                        <ul>
                            ${data.coursework.map(course => `<li>${course}</li>`).join('')}
                        </ul>
                    </div>
                `;
            }
            
            // Add volunteering if it exists
            if (data.volunteering && data.volunteering.length > 0) {
                modalContent += `
                    <div class="modal-section">
                        <h3>Volunteering & Activities</h3>
                        <ul>
                            ${data.volunteering.map(activity => `<li>${activity}</li>`).join('')}
                        </ul>
                    </div>
                `;
            }
        }
        // Handle memory modals with multiple pictures and captions
        else if (modalId.startsWith('memory') && data.pictures) {
            // Add date if it exists
            if (data.date) {
                modalContent += `<p class="modal-date-period">${data.date}</p>`;
            }
            
            // Add pictures with captions in a grid layout
            if (data.pictures && data.pictures.length > 0) {
                modalContent += `<div class="memory-gallery">`;
                 data.pictures.forEach((picture, index) => {
                     // Build custom positioning style if provided
                     let positionStyle = '';
                     if (picture.positionX !== undefined || picture.positionY !== undefined) {
                         const x = picture.positionX !== undefined ? `${picture.positionX}px` : 'center';
                         const y = picture.positionY !== undefined ? `${picture.positionY}px` : 'center';
                         positionStyle = `object-position: ${x} ${y};`;
                     }
                     
                     // Build custom height style if provided
                     let heightStyle = '';
                     let containerClass = 'picture-container';
                     if (picture.height !== undefined) {
                         heightStyle = `height: ${picture.height}px;`;
                         containerClass += ' custom-height';
                     }
                     
                     modalContent += `
                         <div class="memory-picture">
                             <div class="${containerClass}" style="${heightStyle}">
                                 <img src="${picture.image}" alt="Memory ${index + 1}" style="${positionStyle}">
                             </div>
                             <p class="picture-caption">${picture.caption}</p>
                         </div>
                     `;
                 });
                modalContent += `</div>`;
            }
        }
        // Handle experience modals
        else if (modalId.startsWith('exp')) {
            // Add tasks only if they exist
            if (data.tasks && data.tasks.length > 0) {
                modalContent += `
                    <div class="modal-section">
                        <h3>Responsibilities & Achievements</h3>
                        <ul>
                            ${data.tasks.map(task => `<li>${task}</li>`).join('')}
                        </ul>
                    </div>
                `;
            }
        }
        // Fallback to old format for non-recipe, non-education, non-experience modals
        else if (data.tasks && !data.ingredients) {
            modalContent += `
            <h3>Tasks:</h3>
            <ul>
                ${data.tasks.map(task => `<li>${task}</li>`).join('')}
            </ul>
        `;
        }
        
        modalBody.innerHTML = modalContent;
        
        // Add memory-modal class for memory modals
        if (modalId.startsWith('memory')) {
            modal.classList.add('memory-modal');
        }
        
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
}

function closeModal() {
    const modal = document.getElementById('modal');
    
    // Stop video playback if it's a video modal
    if (modal.classList.contains('video-modal')) {
        const iframe = modal.querySelector('iframe');
        if (iframe) {
            // Replace the src with a blank page to stop video playback
            iframe.src = 'about:blank';
        }
    }
    
    modal.style.display = 'none';
    modal.classList.remove('video-modal'); // Remove video modal class
    modal.classList.remove('memory-modal'); // Remove memory modal class
    document.body.style.overflow = 'auto'; // Restore scrolling
}

// Video modal functionality for popup reader
function openVideoModal(modalId) {
    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modal-body');
    const data = modalData[modalId];

    if (data && data.isVideo) {
        let modalContent = `
            <h2>${data.title}</h2>
        `;
        
        // Add date if it exists
        if (data.date) {
            modalContent += `<p class="modal-date-period">${data.date}</p>`;
        }
        
        // Add description if it exists
        if (data.description) {
            modalContent += `<p class="modal-description">${data.description}</p>`;
        }
        
        // Add video embed
        if (data.videoUrl) {
            modalContent += `
                <div class="video-container">
                    <iframe 
                        src="${data.videoUrl}" 
                        width="100%" 
                        height="400" 
                        frameborder="0" 
                        allowfullscreen
                        allow="autoplay; fullscreen">
                    </iframe>
                </div>
            `;
        }
        
        modalBody.innerHTML = modalContent;
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
        
        // Add special styling for video modal
        modal.classList.add('video-modal');
        
        // Store the video URL for potential cleanup
        modal.setAttribute('data-video-url', data.videoUrl);
    }
}

// Close modal when clicking outside of it
window.addEventListener('click', function(event) {
    const modal = document.getElementById('modal');
    if (event.target === modal) {
        closeModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeModal();
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(47, 72, 88, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.backgroundColor = '#2f4858';
        navbar.style.backdropFilter = 'none';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.card, .slide-content, .section-title');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Card slider navigation - Simplified system
const cardSliderPositions = {};

function initCardSliders() {
    const cardContainers = document.querySelectorAll('.card-container');
    
    cardContainers.forEach(container => {
        const containerId = container.id;
        // Remove '-container' suffix to get the base ID
        const baseId = containerId.replace('-container', '');
        cardSliderPositions[baseId] = 0;
        
        // Set initial transform
        container.style.transform = 'translateX(0px)';
        
        updateCardSliderButtons(baseId);
        createPaginationDots(baseId);
    });
}

function moveCardSlider(containerId, direction) {
    const container = document.getElementById(containerId + '-container');
    if (!container) return;
    
    const cards = container.querySelectorAll('.card:not(.hidden)');
    const totalCards = cards.length;
    const cardsPerView = getCardsPerView();
    const maxPosition = Math.max(0, totalCards - cardsPerView);
    
    // Initialize position if not set
    if (cardSliderPositions[containerId] === undefined) {
        cardSliderPositions[containerId] = 0;
    }
    
    // Move one card at a time
    cardSliderPositions[containerId] += direction;
    
    // Clamp position within bounds
    if (cardSliderPositions[containerId] < 0) {
        cardSliderPositions[containerId] = 0;
    } else if (cardSliderPositions[containerId] > maxPosition) {
        cardSliderPositions[containerId] = maxPosition;
    }
    
    // Calculate transform value
    const cardWidth = 300; // Fixed card width
    const gap = 32; // Gap between cards
    const cardStep = cardWidth + gap;
    
    let transformValue;
    if (cardsPerView === 1) {
        // Single card mode - center the card
        const screenWidth = window.innerWidth;
        const containerPadding = 32; // 1rem padding on each side
        const availableWidth = screenWidth - containerPadding;
        const centerOffset = (availableWidth - cardWidth) / 2;
        transformValue = -cardSliderPositions[containerId] * cardStep + centerOffset;
    } else {
        // Multiple cards mode - simple positioning
        transformValue = -cardSliderPositions[containerId] * cardStep;
    }
    
    container.style.transform = `translateX(${transformValue}px)`;
    
    updateCardSliderButtons(containerId);
    updatePaginationDots(containerId);
}

function updateCardSliderButtons(containerId) {
    const container = document.getElementById(containerId + '-container');
    if (!container) return;
    
    const cards = container.querySelectorAll('.card:not(.hidden)');
    const totalCards = cards.length;
    const cardsPerView = getCardsPerView();
    const maxPosition = Math.max(0, totalCards - cardsPerView);
    
    const prevBtn = container.parentElement.querySelector('.prev');
    const nextBtn = container.parentElement.querySelector('.next');
    
    if (prevBtn) {
        prevBtn.disabled = cardSliderPositions[containerId] === 0;
    }
    if (nextBtn) {
        nextBtn.disabled = cardSliderPositions[containerId] >= maxPosition;
    }
}

function getCardsPerView() {
    const screenWidth = window.innerWidth;
    const cardWidth = 300; // Fixed card width
    const gap = 32; // Gap between cards
    const containerPadding = 32; // 1rem padding on each side
    
    // Calculate how many cards can fit
    const availableWidth = screenWidth - containerPadding;
    const cardsPerView = Math.floor((availableWidth + gap) / (cardWidth + gap));
    
    // Simple logic: 3 cards when possible, otherwise 1 centered card
    if (cardsPerView >= 3) {
        return 3;
    } else {
        return 1; // Single centered card when not enough space for 3
    }
}

// Initialize card sliders when DOM is loaded
document.addEventListener('DOMContentLoaded', initCardSliders);

// Update card slider buttons on window resize
window.addEventListener('resize', function() {
    Object.keys(cardSliderPositions).forEach(containerId => {
        const container = document.getElementById(containerId + '-container');
        if (container) {
            // Ensure position is within bounds after resize
            const cards = container.querySelectorAll('.card:not(.hidden)');
            const totalCards = cards.length;
            const cardsPerView = getCardsPerView();
            const maxPosition = Math.max(0, totalCards - cardsPerView);
            
            // Clamp position to ensure first card is accessible
            if (cardSliderPositions[containerId] > maxPosition) {
                cardSliderPositions[containerId] = maxPosition;
            }
            if (cardSliderPositions[containerId] < 0) {
                cardSliderPositions[containerId] = 0;
            }
            
            // Recalculate transform with proper centering
            const cardWidth = 300; // Fixed card width
            const gap = 32; // Gap between cards
            const cardStep = cardWidth + gap;
            
            let transformValue;
            if (cardsPerView === 1) {
                // Single card mode - center the card
                const screenWidth = window.innerWidth;
                const containerPadding = 32; // 1rem padding on each side
                const availableWidth = screenWidth - containerPadding;
                const centerOffset = (availableWidth - cardWidth) / 2;
                transformValue = -cardSliderPositions[containerId] * cardStep + centerOffset;
            } else {
                // Multiple cards mode - simple positioning
                transformValue = -cardSliderPositions[containerId] * cardStep;
            }
            
            container.style.transform = `translateX(${transformValue}px)`;
        }
        
        updateCardSliderButtons(containerId);
        createPaginationDots(containerId);
        updatePaginationDots(containerId);
    });
});

// Enhanced touch/swipe support for carousels
let touchStartX = 0;
let touchEndX = 0;
let touchStartY = 0;
let touchEndY = 0;
let isDragging = false;

// Main carousel swipe
document.querySelector('.carousel-wrapper').addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;
});

document.querySelector('.carousel-wrapper').addEventListener('touchend', function(e) {
    touchEndX = e.changedTouches[0].screenX;
    touchEndY = e.changedTouches[0].screenY;
    handleCarouselSwipe();
});

function handleCarouselSwipe() {
    const swipeThreshold = 50;
    const diffX = touchStartX - touchEndX;
    const diffY = touchStartY - touchEndY;
    
    // Only handle horizontal swipes
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > swipeThreshold) {
        if (diffX > 0) {
            // Swipe left - next slide
            changeSlide(1);
        } else {
            // Swipe right - previous slide
            changeSlide(-1);
        }
    }
}

// Card carousel swipe functionality
function initCardCarouselSwipe() {
    const cardContainers = document.querySelectorAll('.card-container');
    
    cardContainers.forEach(container => {
        let startX = 0;
        let currentX = 0;
        let isDragging = false;
        let startTransform = 0;
        
        container.addEventListener('touchstart', function(e) {
            startX = e.touches[0].clientX;
            isDragging = true;
            this.classList.add('swiping');
            
            // Get current transform value
            const transform = this.style.transform;
            startTransform = transform ? parseFloat(transform.match(/-?\d+\.?\d*/)[0]) : 0;
        });
        
        container.addEventListener('touchmove', function(e) {
            if (!isDragging) return;
            
            currentX = e.touches[0].clientX;
            const diffX = currentX - startX;
            const newTransform = startTransform + diffX;
            
            this.style.transform = `translateX(${newTransform}px)`;
        });
        
        container.addEventListener('touchend', function(e) {
            if (!isDragging) return;
            
            isDragging = false;
            this.classList.remove('swiping');
            
            const diffX = currentX - startX;
            const swipeThreshold = 50;
            
            if (Math.abs(diffX) > swipeThreshold) {
                const containerId = this.id.replace('-container', '');
                
                if (diffX > 0) {
                    // Swipe right - previous
                    moveCardSlider(containerId, -1);
                } else {
                    // Swipe left - next
                    moveCardSlider(containerId, 1);
                }
            } else {
                // Snap back to current position
                const containerId = this.id.replace('-container', '');
                const currentPosition = cardSliderPositions[containerId] || 0;
                const cards = this.querySelectorAll('.card:not(.hidden)');
                const totalCards = cards.length;
                const cardsPerView = getCardsPerView();
                const maxPosition = Math.max(0, totalCards - cardsPerView);
                
                // Ensure position is within bounds
                const clampedPosition = Math.max(0, Math.min(currentPosition, maxPosition));
                cardSliderPositions[containerId] = clampedPosition;
                
                const cardWidth = 300; // Fixed card width
                const gap = 32; // Gap between cards
                const cardStep = cardWidth + gap;
                
                let transformValue;
                if (cardsPerView === 1) {
                    // Single card mode - center the card
                    const screenWidth = window.innerWidth;
                    const containerPadding = 32; // 1rem padding on each side
                    const availableWidth = screenWidth - containerPadding;
                    const centerOffset = (availableWidth - cardWidth) / 2;
                    transformValue = -clampedPosition * cardStep + centerOffset;
                } else {
                    // Multiple cards mode - simple positioning
                    transformValue = -clampedPosition * cardStep;
                }
                
                this.style.transform = `translateX(${transformValue}px)`;
            }
        });
    });
}

// Initialize card carousel swipe when DOM is loaded
document.addEventListener('DOMContentLoaded', initCardCarouselSwipe);

// Performance optimization: Lazy loading for images
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', lazyLoadImages);

// Pagination dots functionality
function createPaginationDots(containerId) {
    const container = document.getElementById(containerId + '-container');
    const dotsContainer = document.getElementById(containerId + '-dots');
    
    if (!container || !dotsContainer) return;
    
    const cards = container.querySelectorAll('.card:not(.hidden)');
    const totalCards = cards.length;
    const cardsPerView = getCardsPerView();
    
    // Calculate number of pages needed for one-card-at-a-time scrolling
    const totalPages = Math.max(1, totalCards - cardsPerView + 1);
    
    // Clear existing dots
    dotsContainer.innerHTML = '';
    
    // Only show dots if there are multiple pages
    if (totalPages > 1) {
        // If more than 10 pages, show line with active dot
        if (totalPages > 10) {
            const lineContainer = document.createElement('div');
            lineContainer.className = 'pagination-line-container';
            
            const line = document.createElement('div');
            line.className = 'pagination-line';
            
            const activeDot = document.createElement('div');
            activeDot.className = 'pagination-line-dot active';
            
            lineContainer.appendChild(line);
            lineContainer.appendChild(activeDot);
            dotsContainer.appendChild(lineContainer);
            
            // Add click handler to the line container
            lineContainer.addEventListener('click', (e) => {
                const rect = lineContainer.getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                const percentage = clickX / rect.width;
                const pageIndex = Math.round(percentage * (totalPages - 1));
                goToSwipe(containerId, pageIndex);
            });
        } else {
            // Create dots (original behavior)
            for (let i = 0; i < totalPages; i++) {
                const dot = document.createElement('div');
                dot.className = 'pagination-dot';
                if (i === 0) dot.classList.add('active');
                
                dot.addEventListener('click', () => {
                    goToSwipe(containerId, i);
                });
                
                dotsContainer.appendChild(dot);
            }
        }
    }
}

function updatePaginationDots(containerId) {
    const container = document.getElementById(containerId + '-container');
    const dotsContainer = document.getElementById(containerId + '-dots');
    
    if (!container || !dotsContainer) return;
    
    const cards = container.querySelectorAll('.card:not(.hidden)');
    const totalCards = cards.length;
    const cardsPerView = getCardsPerView();
    const totalPages = Math.max(1, totalCards - cardsPerView + 1);
    const currentPosition = cardSliderPositions[containerId] || 0;
    
    if (totalPages > 10) {
        // Update line-based pagination
        const lineContainer = dotsContainer.querySelector('.pagination-line-container');
        const activeDot = dotsContainer.querySelector('.pagination-line-dot');
        
        if (lineContainer && activeDot) {
            const percentage = (currentPosition / (totalPages - 1)) * 100;
            activeDot.style.left = `${percentage}%`;
        }
    } else {
        // Update individual dots (original behavior)
        const dots = dotsContainer.querySelectorAll('.pagination-dot');
        const activeDotIndex = currentPosition;
        
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === activeDotIndex);
        });
    }
}

function goToSwipe(containerId, swipeIndex) {
    const container = document.getElementById(containerId + '-container');
    if (!container) return;
    
    const cards = container.querySelectorAll('.card:not(.hidden)');
    const totalCards = cards.length;
    const cardsPerView = getCardsPerView();
    
    // Calculate max position to ensure last card is fully displayed
    const maxPosition = Math.max(0, totalCards - cardsPerView);
    
    // Set position directly to swipe index (one card at a time)
    cardSliderPositions[containerId] = Math.min(swipeIndex, maxPosition);
    
    // Ensure position is within bounds
    if (cardSliderPositions[containerId] < 0) {
        cardSliderPositions[containerId] = 0;
    }
    
    // Apply transform with proper centering
    const cardWidth = 300; // Fixed card width
    const gap = 32; // Gap between cards
    const cardStep = cardWidth + gap;
    
    let transformValue;
    if (cardsPerView === 1) {
        // Single card mode - center the card
        const screenWidth = window.innerWidth;
        const containerPadding = 32; // 1rem padding on each side
        const availableWidth = screenWidth - containerPadding;
        const centerOffset = (availableWidth - cardWidth) / 2;
        transformValue = -cardSliderPositions[containerId] * cardStep + centerOffset;
    } else {
        // Multiple cards mode - simple positioning
        transformValue = -cardSliderPositions[containerId] * cardStep;
    }
    
    container.style.transform = `translateX(${transformValue}px)`;
    
    // Update buttons and dots
    updateCardSliderButtons(containerId);
    updatePaginationDots(containerId);
}
