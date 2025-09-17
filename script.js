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
    
    // Create dots for each slide
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

function updateHighlightsDots() {
    const dotsContainer = document.getElementById('highlights-dots');
    if (!dotsContainer) return;
    
    const dots = dotsContainer.querySelectorAll('.pagination-dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
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
        title: 'E-Commerce Platform',
        image: 'img/Fishing.jpg',
        description: 'A comprehensive e-commerce platform built with React and Node.js. Features include user authentication, product catalog, shopping cart, payment integration, and admin dashboard. The application handles thousands of concurrent users and processes thousands of orders daily.',
        details: [
            'Built with React.js for frontend and Node.js with Express for backend',
            'Integrated Stripe payment gateway for secure transactions',
            'Implemented JWT authentication and authorization',
            'Used MongoDB for data storage with Mongoose ODM',
            'Deployed on AWS with Docker containers',
            'Achieved 99.9% uptime and sub-2 second page load times'
        ]
    },
    'project2': {
        title: 'Mobile Banking App',
        image: 'img/Fishing.jpg',
        description: 'A cross-platform mobile banking application developed with Flutter. The app provides secure banking services including account management, fund transfers, bill payments, and investment tracking.',
        details: [
            'Developed using Flutter for iOS and Android platforms',
            'Integrated biometric authentication (fingerprint and face recognition)',
            'Implemented real-time notifications using Firebase',
            'Used RESTful APIs for backend communication',
            'Applied Material Design principles for intuitive UX',
            'Achieved 4.8/5 rating on app stores'
        ]
    },
    'project3': {
        title: 'AI Chatbot',
        image: 'img/Fishing.jpg',
        description: 'An intelligent chatbot powered by machine learning algorithms. The bot can handle customer inquiries, provide product recommendations, and assist with technical support.',
        details: [
            'Built using Python with TensorFlow and Natural Language Processing',
            'Trained on 10,000+ customer interaction datasets',
            'Integrated with multiple communication channels (web, mobile, social)',
            'Achieved 85% customer satisfaction rate',
            'Reduced customer service response time by 70%',
            'Continuously learning from user interactions'
        ]
    },
    'project4': {
        title: 'Task Management App',
        image: 'img/Fishing.jpg',
        description: 'A collaborative project management tool with real-time updates, team collaboration features, and advanced task tracking.',
        details: [
            'Built with React.js frontend and Node.js backend',
            'Real-time collaboration using Socket.io',
            'Drag-and-drop task management interface',
            'Team member assignment and progress tracking',
            'File sharing and document collaboration',
            'Mobile-responsive design with PWA capabilities'
        ]
    },
    'project5': {
        title: 'REST API Service',
        image: 'img/Fishing.jpg',
        description: 'A scalable microservice architecture providing RESTful APIs for multiple client applications with authentication and rate limiting.',
        details: [
            'Microservices architecture with Docker containers',
            'JWT-based authentication and authorization',
            'Rate limiting and API versioning',
            'Comprehensive API documentation with Swagger',
            'Database optimization and caching with Redis',
            'Load balancing and auto-scaling on AWS'
        ]
    },
    'edu1': {
        title: 'Computer Science Degree',
        image: 'img/Fishing.jpg',
        description: 'Bachelor of Science in Computer Science from University of Technology. Graduated with honors and specialized in software engineering and artificial intelligence.',
        details: [
            'GPA: 3.8/4.0',
            'Relevant coursework: Data Structures, Algorithms, Database Systems, Software Engineering',
            'Senior project: Developed a machine learning model for predictive analytics',
            'Active member of Computer Science Society',
            'Participated in multiple hackathons and coding competitions',
            'Graduated: May 2020'
        ]
    },
    'edu2': {
        title: 'AWS Certification',
        image: 'img/Fishing.jpg',
        description: 'AWS Certified Solutions Architect - Professional level certification. Demonstrates expertise in designing distributed systems on AWS.',
        details: [
            'Certification ID: AWS-SAP-123456',
            'Valid until: December 2025',
            'Skills: Cloud architecture, security, cost optimization, scalability',
            'Experience with EC2, S3, Lambda, RDS, CloudFormation',
            'Designed and implemented cloud solutions for enterprise clients',
            'Completed 40+ hours of hands-on labs and projects'
        ]
    },
    'edu3': {
        title: 'Master\'s in AI',
        image: 'img/Fishing.jpg',
        description: 'Advanced degree in Artificial Intelligence and Machine Learning with focus on deep learning and neural networks.',
        details: [
            'GPA: 3.9/4.0',
            'Specialization: Deep Learning and Computer Vision',
            'Thesis: "Neural Networks for Image Recognition"',
            'Research: Published 3 papers in AI conferences',
            'Technologies: TensorFlow, PyTorch, OpenCV, scikit-learn',
            'Graduated: May 2022'
        ]
    },
    'edu4': {
        title: 'Full Stack Bootcamp',
        image: 'img/Fishing.jpg',
        description: 'Intensive 6-month program covering modern web development technologies and best practices.',
        details: [
            'Duration: 6 months (January - June 2019)',
            'Technologies: HTML5, CSS3, JavaScript, React, Node.js',
            'Projects: Built 5 full-stack applications',
            'Final Project: E-commerce platform with payment integration',
            'Certification: Full Stack Web Development',
            'Outcome: 100% job placement rate within 3 months'
        ]
    },
    'exp1': {
        title: 'Senior Software Developer',
        image: 'img/Fishing.jpg',
        description: 'Leading a team of 5 developers in building scalable web applications. Responsible for architecture decisions, code reviews, and mentoring junior developers.',
        details: [
            'Company: Tech Corp (2021 - Present)',
            'Led development of microservices architecture serving 1M+ users',
            'Implemented CI/CD pipelines reducing deployment time by 60%',
            'Mentored 3 junior developers and conducted technical interviews',
            'Collaborated with product managers and designers on feature planning',
            'Technologies: React, Node.js, Docker, Kubernetes, AWS'
        ]
    },
    'exp2': {
        title: 'Full Stack Developer',
        image: 'img/Fishing.jpg',
        description: 'Developed full-stack web applications from concept to deployment. Worked closely with clients to understand requirements and deliver high-quality solutions.',
        details: [
            'Company: StartupXYZ (2019 - 2021)',
            'Built 10+ web applications using modern JavaScript frameworks',
            'Integrated third-party APIs and payment gateways',
            'Optimized application performance resulting in 40% faster load times',
            'Collaborated with cross-functional teams in agile environment',
            'Technologies: Vue.js, Express.js, PostgreSQL, Redis'
        ]
    },
    'exp3': {
        title: 'Frontend Team Lead',
        image: 'img/Fishing.jpg',
        description: 'Led a team of 4 frontend developers in creating responsive web applications and managing the frontend architecture.',
        details: [
            'Company: Digital Agency (2020 - 2021)',
            'Led frontend development for 15+ client projects',
            'Implemented design systems and component libraries',
            'Mentored junior developers and conducted code reviews',
            'Technologies: React, Vue.js, TypeScript, Sass',
            'Achievement: Improved page load times by 50%'
        ]
    },
    'exp4': {
        title: 'Backend Developer',
        image: 'img/Fishing.jpg',
        description: 'Developed scalable backend services and APIs for enterprise clients using modern technologies and best practices.',
        details: [
            'Company: CloudTech Solutions (2018 - 2020)',
            'Built RESTful APIs serving 100k+ requests daily',
            'Implemented microservices architecture',
            'Database design and optimization',
            'Technologies: Python, Django, PostgreSQL, Redis',
            'Achievement: Reduced API response time by 40%'
        ]
    },
    'skill1': {
        title: 'Frontend Development',
        image: 'img/Fishing.jpg',
        description: 'Expertise in modern frontend technologies and frameworks. Passionate about creating responsive, accessible, and performant user interfaces.',
        details: [
            'React.js: 4+ years experience, including hooks, context, and Redux',
            'Vue.js: 3+ years experience with Vuex and Vue Router',
            'HTML5/CSS3: Semantic markup, CSS Grid, Flexbox, animations',
            'JavaScript ES6+: Async/await, modules, destructuring, arrow functions',
            'TypeScript: Type-safe development and better code maintainability',
            'Testing: Jest, Cypress, React Testing Library'
        ]
    },
    'skill2': {
        title: 'Backend Development',
        image: 'img/Fishing.jpg',
        description: 'Strong background in server-side development, database design, and API development. Experience with both SQL and NoSQL databases.',
        details: [
            'Node.js: Express.js, Koa.js, and NestJS frameworks',
            'Python: Django, Flask, and FastAPI for web development',
            'Java: Spring Boot for enterprise applications',
            'Databases: PostgreSQL, MongoDB, Redis, MySQL',
            'APIs: RESTful design, GraphQL, microservices architecture',
            'DevOps: Docker, Kubernetes, CI/CD, AWS, monitoring'
        ]
    },
    'skill3': {
        title: 'DevOps & Cloud',
        image: 'img/Fishing.jpg',
        description: 'Expertise in cloud infrastructure, containerization, and deployment automation. Focus on scalable and reliable systems.',
        details: [
            'AWS: EC2, S3, Lambda, RDS, CloudFormation, ECS, EKS',
            'Docker: Containerization and orchestration',
            'Kubernetes: Cluster management and scaling',
            'CI/CD: GitHub Actions, Jenkins, GitLab CI',
            'Monitoring: CloudWatch, Prometheus, Grafana',
            'Infrastructure as Code: Terraform, Ansible'
        ]
    },
    'skill4': {
        title: 'Mobile Development',
        image: 'img/Fishing.jpg',
        description: 'Cross-platform mobile development experience with modern frameworks and native iOS/Android development.',
        details: [
            'React Native: Cross-platform mobile apps',
            'Flutter: Dart-based mobile development',
            'iOS: Swift and Objective-C development',
            'Android: Java and Kotlin development',
            'Mobile UI/UX: Material Design and Human Interface Guidelines',
            'App Store: Publishing and distribution experience'
        ]
    },
    'vacation1': {
        title: 'Japan Adventure',
        image: 'img/Fishing.jpg',
        description: 'An unforgettable two-week journey through Japan, exploring the perfect blend of traditional culture and modern innovation.',
        details: [
            'Duration: 14 days (March 2023)',
            'Cities visited: Tokyo, Kyoto, Osaka, Nara, Hakone',
            'Highlights: Cherry blossom viewing, traditional tea ceremonies, bullet train rides',
            'Accommodations: Ryokans, capsule hotels, and modern hotels',
            'Food experiences: Sushi making class, ramen tours, street food adventures',
            'Cultural activities: Temple visits, sumo wrestling, karaoke nights',
            'Budget: $3,500 including flights, accommodation, and activities'
        ]
    },
    'vacation2': {
        title: 'European Tour',
        image: 'img/Fishing.jpg',
        description: 'A three-month backpacking adventure across Europe, experiencing diverse cultures, cuisines, and landscapes.',
        details: [
            'Duration: 3 months (Summer 2022)',
            'Countries: France, Italy, Spain, Germany, Netherlands, Czech Republic, Austria, Switzerland',
            'Transportation: Eurail pass, budget airlines, local buses',
            'Accommodation: Hostels, Airbnb, couchsurfing',
            'Budget: $4,000 total (very budget-friendly approach)',
            'Highlights: Eiffel Tower, Colosseum, Sagrada Familia, Oktoberfest',
            'Skills gained: Language basics, budget travel, cultural awareness'
        ]
    },
    'vacation3': {
        title: 'Thailand Islands',
        image: 'img/Fishing.jpg',
        description: 'Beach hopping and cultural exploration in Southeast Asia, experiencing the beautiful islands and rich culture of Thailand.',
        details: [
            'Duration: 10 days (December 2023)',
            'Islands visited: Phuket, Koh Phi Phi, Koh Samui, Koh Tao',
            'Activities: Snorkeling, island hopping, temple visits, street food tours',
            'Accommodation: Beach resorts and bungalows',
            'Budget: $1,200 including flights and activities',
            'Highlights: Full moon party, elephant sanctuary, Thai cooking class'
        ]
    },
    'vacation4': {
        title: 'New Zealand Road Trip',
        image: 'img/Fishing.jpg',
        description: 'Adventure through the stunning landscapes of Middle Earth, exploring both North and South Islands of New Zealand.',
        details: [
            'Duration: 21 days (February 2024)',
            'Route: Auckland to Queenstown via both islands',
            'Activities: Hiking, bungee jumping, glacier tours, wine tasting',
            'Transportation: Rental car and domestic flights',
            'Budget: $4,500 including flights and accommodation',
            'Highlights: Milford Sound, Hobbiton, Franz Josef Glacier'
        ]
    },
    // Recipe modals - grouped together
    'recipe1': {
        title: 'Far Breton',
        category: 'Patisserie',
        image: 'img/Fishing.jpg',
        description: 'Traditional French dessert from Brittany, a custard-like cake with prunes.',
        servings: '6 servings',
        ingredients: [
            '20 Prunes',
            '200g Flour',
            '150g Sugar',
            '4 eggs',
            '75cl Milk'
        ],
        cookingSteps: [
            'Preheat oven to 180°C (350°F)',
            'Soak prunes in warm water for 30 minutes',
            'Mix flour and sugar in a bowl',
            'Add eggs and milk gradually, whisking until smooth',
            'Drain prunes and arrange in baking dish',
            'Pour batter over prunes',
            'Bake for 30 minutes until golden'
        ],
        modifications: 'Add rum to the batter for extra flavor.',
        videoTutorial: null
    },
    'recipe2': {
        title: 'Flan Patissier',
        category: 'Patisserie',
        image: 'img/Fishing.jpg',
        description: 'Classic French custard tart with a buttery pastry crust.',
        servings: '8 servings',
        ingredients: [
            'Pâte brisée: 300g Flour, 150g Butter, 8cl Water, 3 tbsp Sugar',
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
        videoTutorial: 'https://www.youtube.com/watch?v=example2'
    },
    'recipe3': {
        title: 'Cassoulet (Bastien version)',
        category: 'Plat de résistance',
        image: 'img/Fishing.jpg',
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
            'Cook beans until tender',
            'Brown lard and sausage in a large pot',
            'Add onions and garlic, cook until softened',
            'Add tomatoes and cooked beans',
            'Simmer for 30 minutes until flavors meld'
        ],
        modifications: null,
        videoTutorial: null
    },
    'recipe4': {
        title: 'Pain',
        category: 'Accompagnement',
        image: 'img/Fishing.jpg',
        description: 'Traditional French bread recipe.',
        servings: '4 servings',
        ingredients: [
            '100g + 150g Water',
            '100g + 250g Flour',
            '5g Yeast',
            '1 tsp Salt'
        ],
        cookingSteps: [
            'Mix yeast with warm water and let activate',
            'Combine flour and salt in a large bowl',
            'Add yeast mixture and remaining water',
            'Knead until smooth and elastic',
            'Let rise until doubled in size',
            'Shape into loaf and let rise again',
            'Bake at 220°C for 20-30 minutes until golden'
        ],
        modifications: null,
        videoTutorial: null
    },
    'recipe5': {
        title: 'Crumble',
        category: 'Dessert',
        image: 'img/Fishing.jpg',
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
        image: 'img/Fishing.jpg',
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
        category: 'Plat de résistance',
        image: 'img/Fishing.jpg',
        description: 'Homemade lasagne with fresh pasta, bolognese sauce, and béchamel.',
        servings: '6 servings',
        ingredients: [
            'Pasta: 4 Egg, 400g Flour, 1 tbsp Salt',
            'Bolognese sauce: 700g Ground beef, 2 Onions, 4 Garlic cloves, Basil, Oregano, Thyme, 1.5lb Crushed tomato',
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
        modifications: 'Add spinach to the pasta. Add celery and carrot to Bolognese sauce. Replace the Beef by vegetables.',
        videoTutorial: 'https://www.youtube.com/watch?v=example7'
    },
    'recipe8': {
        title: 'Mousse au chocolat',
        category: 'Dessert',
        image: 'img/Fishing.jpg',
        description: 'Light and airy chocolate mousse.',
        servings: '6 servings',
        ingredients: [
            'Chocolate Base: 200g Dark Chocolate, 6 Egg Yolk, Butter',
            '6 Whipped Egg white'
        ],
        cookingSteps: [
            'Melt chocolate with butter',
            'Beat egg yolks and fold into chocolate',
            'Whip egg whites until stiff peaks',
            'Gently fold egg whites into chocolate mixture',
            'Chill for at least 2 hours before serving'
        ],
        modifications: 'Add rum or Orange flower water.',
        videoTutorial: null
    },
    // Blank recipes 9-51 (to be completed manually)
    'recipe9': {
        title: 'Recipe 9',
        category: 'Category',
        image: 'img/Fishing.jpg',
        description: 'Description to be added',
        servings: 'Servings to be added',
        ingredients: [],
        cookingSteps: [],
        modifications: null,
        videoTutorial: null
    },
    'recipe10': {
        title: 'Recipe 10',
        category: 'Category',
        image: 'img/Fishing.jpg',
        description: 'Description to be added',
        servings: 'Servings to be added',
        ingredients: [],
        cookingSteps: [],
        modifications: null,
        videoTutorial: null
    },
    'recipe11': {
        title: 'Recipe 11',
        category: 'Category',
        image: 'img/Fishing.jpg',
        description: 'Description to be added',
        servings: 'Servings to be added',
        ingredients: [],
        cookingSteps: [],
        modifications: null,
        videoTutorial: null
    },
    'recipe12': {
        title: 'Recipe 12',
        category: 'Category',
        image: 'img/Fishing.jpg',
        description: 'Description to be added',
        servings: 'Servings to be added',
        ingredients: [],
        cookingSteps: [],
        modifications: null,
        videoTutorial: null
    },
    'recipe13': {
        title: 'Recipe 13',
        category: 'Category',
        image: 'img/Fishing.jpg',
        description: 'Description to be added',
        servings: 'Servings to be added',
        ingredients: [],
        cookingSteps: [],
        modifications: null,
        videoTutorial: null
    },
    'recipe14': {
        title: 'Recipe 14',
        category: 'Category',
        image: 'img/Fishing.jpg',
        description: 'Description to be added',
        servings: 'Servings to be added',
        ingredients: [],
        cookingSteps: [],
        modifications: null,
        videoTutorial: null
    },
    'recipe15': {
        title: 'Recipe 15',
        category: 'Category',
        image: 'img/Fishing.jpg',
        description: 'Description to be added',
        servings: 'Servings to be added',
        ingredients: [],
        cookingSteps: [],
        modifications: null,
        videoTutorial: null
    },
    'recipe16': {
        title: 'Recipe 16',
        category: 'Category',
        image: 'img/Fishing.jpg',
        description: 'Description to be added',
        servings: 'Servings to be added',
        ingredients: [],
        cookingSteps: [],
        modifications: null,
        videoTutorial: null
    },
    'recipe17': {
        title: 'Recipe 17',
        category: 'Category',
        image: 'img/Fishing.jpg',
        description: 'Description to be added',
        servings: 'Servings to be added',
        ingredients: [],
        cookingSteps: [],
        modifications: null,
        videoTutorial: null
    },
    'recipe18': {
        title: 'Recipe 18',
        category: 'Category',
        image: 'img/Fishing.jpg',
        description: 'Description to be added',
        servings: 'Servings to be added',
        ingredients: [],
        cookingSteps: [],
        modifications: null,
        videoTutorial: null
    },
    'recipe19': {
        title: 'Recipe 19',
        category: 'Category',
        image: 'img/Fishing.jpg',
        description: 'Description to be added',
        servings: 'Servings to be added',
        ingredients: [],
        cookingSteps: [],
        modifications: null,
        videoTutorial: null
    },
    'recipe20': {
        title: 'Recipe 20',
        category: 'Category',
        image: 'img/Fishing.jpg',
        description: 'Description to be added',
        servings: 'Servings to be added',
        ingredients: [],
        cookingSteps: [],
        modifications: null,
        videoTutorial: null
    },
    'recipe21': {
        title: 'Recipe 21',
        category: 'Category',
        image: 'img/Fishing.jpg',
        description: 'Description to be added',
        servings: 'Servings to be added',
        ingredients: [],
        cookingSteps: [],
        modifications: null,
        videoTutorial: null
    },
    'recipe22': {
        title: 'Recipe 22',
        category: 'Category',
        image: 'img/Fishing.jpg',
        description: 'Description to be added',
        servings: 'Servings to be added',
        ingredients: [],
        cookingSteps: [],
        modifications: null,
        videoTutorial: null
    },
    'recipe23': {
        title: 'Recipe 23',
        category: 'Category',
        image: 'img/Fishing.jpg',
        description: 'Description to be added',
        servings: 'Servings to be added',
        ingredients: [],
        cookingSteps: [],
        modifications: null,
        videoTutorial: null
    },
    'recipe24': {
        title: 'Recipe 24',
        category: 'Category',
        image: 'img/Fishing.jpg',
        description: 'Description to be added',
        servings: 'Servings to be added',
        ingredients: [],
        cookingSteps: [],
        modifications: null,
        videoTutorial: null
    },
    'recipe25': {
        title: 'Recipe 25',
        category: 'Category',
        image: 'img/Fishing.jpg',
        description: 'Description to be added',
        servings: 'Servings to be added',
        ingredients: [],
        cookingSteps: [],
        modifications: null,
        videoTutorial: null
    },
    'recipe26': {
        title: 'Recipe 26',
        category: 'Category',
        image: 'img/Fishing.jpg',
        description: 'Description to be added',
        servings: 'Servings to be added',
        ingredients: [],
        cookingSteps: [],
        modifications: null,
        videoTutorial: null
    },
    'recipe27': {
        title: 'Recipe 27',
        category: 'Category',
        image: 'img/Fishing.jpg',
        description: 'Description to be added',
        servings: 'Servings to be added',
        ingredients: [],
        cookingSteps: [],
        modifications: null,
        videoTutorial: null
    },
    'recipe28': {
        title: 'Recipe 28',
        category: 'Category',
        image: 'img/Fishing.jpg',
        description: 'Description to be added',
        servings: 'Servings to be added',
        ingredients: [],
        cookingSteps: [],
        modifications: null,
        videoTutorial: null
    },
    'recipe29': {
        title: 'Recipe 29',
        category: 'Category',
        image: 'img/Fishing.jpg',
        description: 'Description to be added',
        servings: 'Servings to be added',
        ingredients: [],
        cookingSteps: [],
        modifications: null,
        videoTutorial: null
    },
    'recipe30': {
        title: 'Recipe 30',
        category: 'Category',
        image: 'img/Fishing.jpg',
        description: 'Description to be added',
        servings: 'Servings to be added',
        ingredients: [],
        cookingSteps: [],
        modifications: null,
        videoTutorial: null
    },
    'recipe31': {
        title: 'Recipe 31',
        category: 'Category',
        image: 'img/Fishing.jpg',
        description: 'Description to be added',
        servings: 'Servings to be added',
        ingredients: [],
        cookingSteps: [],
        modifications: null,
        videoTutorial: null
    },
    'recipe32': {
        title: 'Recipe 32',
        category: 'Category',
        image: 'img/Fishing.jpg',
        description: 'Description to be added',
        servings: 'Servings to be added',
        ingredients: [],
        cookingSteps: [],
        modifications: null,
        videoTutorial: null
    },
    'recipe33': {
        title: 'Recipe 33',
        category: 'Category',
        image: 'img/Fishing.jpg',
        description: 'Description to be added',
        servings: 'Servings to be added',
        ingredients: [],
        cookingSteps: [],
        modifications: null,
        videoTutorial: null
    },
    'recipe34': {
        title: 'Recipe 34',
        category: 'Category',
        image: 'img/Fishing.jpg',
        description: 'Description to be added',
        servings: 'Servings to be added',
        ingredients: [],
        cookingSteps: [],
        modifications: null,
        videoTutorial: null
    },
    'recipe35': {
        title: 'Recipe 35',
        category: 'Category',
        image: 'img/Fishing.jpg',
        description: 'Description to be added',
        servings: 'Servings to be added',
        ingredients: [],
        cookingSteps: [],
        modifications: null,
        videoTutorial: null
    },
    'recipe36': {
        title: 'Recipe 36',
        category: 'Category',
        image: 'img/Fishing.jpg',
        description: 'Description to be added',
        servings: 'Servings to be added',
        ingredients: [],
        cookingSteps: [],
        modifications: null,
        videoTutorial: null
    },
    'recipe37': {
        title: 'Recipe 37',
        category: 'Category',
        image: 'img/Fishing.jpg',
        description: 'Description to be added',
        servings: 'Servings to be added',
        ingredients: [],
        cookingSteps: [],
        modifications: null,
        videoTutorial: null
    },
    'recipe38': {
        title: 'Recipe 38',
        category: 'Category',
        image: 'img/Fishing.jpg',
        description: 'Description to be added',
        servings: 'Servings to be added',
        ingredients: [],
        cookingSteps: [],
        modifications: null,
        videoTutorial: null
    },
    'recipe39': {
        title: 'Recipe 39',
        category: 'Category',
        image: 'img/Fishing.jpg',
        description: 'Description to be added',
        servings: 'Servings to be added',
        ingredients: [],
        cookingSteps: [],
        modifications: null,
        videoTutorial: null
    },
    'recipe40': {
        title: 'Recipe 40',
        category: 'Category',
        image: 'img/Fishing.jpg',
        description: 'Description to be added',
        servings: 'Servings to be added',
        ingredients: [],
        cookingSteps: [],
        modifications: null,
        videoTutorial: null
    },
    'recipe41': {
        title: 'Recipe 41',
        category: 'Category',
        image: 'img/Fishing.jpg',
        description: 'Description to be added',
        servings: 'Servings to be added',
        ingredients: [],
        cookingSteps: [],
        modifications: null,
        videoTutorial: null
    },
    'recipe42': {
        title: 'Recipe 42',
        category: 'Category',
        image: 'img/Fishing.jpg',
        description: 'Description to be added',
        servings: 'Servings to be added',
        ingredients: [],
        cookingSteps: [],
        modifications: null,
        videoTutorial: null
    },
    'recipe43': {
        title: 'Recipe 43',
        category: 'Category',
        image: 'img/Fishing.jpg',
        description: 'Description to be added',
        servings: 'Servings to be added',
        ingredients: [],
        cookingSteps: [],
        modifications: null,
        videoTutorial: null
    },
    'recipe44': {
        title: 'Recipe 44',
        category: 'Category',
        image: 'img/Fishing.jpg',
        description: 'Description to be added',
        servings: 'Servings to be added',
        ingredients: [],
        cookingSteps: [],
        modifications: null,
        videoTutorial: null
    },
    'recipe45': {
        title: 'Recipe 45',
        category: 'Category',
        image: 'img/Fishing.jpg',
        description: 'Description to be added',
        servings: 'Servings to be added',
        ingredients: [],
        cookingSteps: [],
        modifications: null,
        videoTutorial: null
    },
    'recipe46': {
        title: 'Recipe 46',
        category: 'Category',
        image: 'img/Fishing.jpg',
        description: 'Description to be added',
        servings: 'Servings to be added',
        ingredients: [],
        cookingSteps: [],
        modifications: null,
        videoTutorial: null
    },
    'recipe47': {
        title: 'Recipe 47',
        category: 'Category',
        image: 'img/Fishing.jpg',
        description: 'Description to be added',
        servings: 'Servings to be added',
        ingredients: [],
        cookingSteps: [],
        modifications: null,
        videoTutorial: null
    },
    'recipe48': {
        title: 'Recipe 48',
        category: 'Category',
        image: 'img/Fishing.jpg',
        description: 'Description to be added',
        servings: 'Servings to be added',
        ingredients: [],
        cookingSteps: [],
        modifications: null,
        videoTutorial: null
    },
    'recipe49': {
        title: 'Recipe 49',
        category: 'Category',
        image: 'img/Fishing.jpg',
        description: 'Description to be added',
        servings: 'Servings to be added',
        ingredients: [],
        cookingSteps: [],
        modifications: null,
        videoTutorial: null
    },
    'recipe50': {
        title: 'Recipe 50',
        category: 'Category',
        image: 'img/Fishing.jpg',
        description: 'Description to be added',
        servings: 'Servings to be added',
        ingredients: [],
        cookingSteps: [],
        modifications: null,
        videoTutorial: null
    },
    'recipe51': {
        title: 'Recipe 51',
        category: 'Category',
        image: 'img/Fishing.jpg',
        description: 'Description to be added',
        servings: 'Servings to be added',
        ingredients: [],
        cookingSteps: [],
        modifications: null,
        videoTutorial: null
    }
};

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
            modalContent += `<div class="modal-section"><h3>Servings</h3><p>${data.servings}</p></div>`;
        }
        
        // Add ingredients if they exist
        if (data.ingredients && data.ingredients.length > 0) {
            modalContent += `
                <div class="modal-section">
                    <h3>Ingredients</h3>
                    <ul>
                        ${data.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
                    </ul>
                </div>
            `;
        }
        
        // Add cooking steps if they exist
        if (data.cookingSteps && data.cookingSteps.length > 0) {
            modalContent += `
                <div class="modal-section">
                    <h3>Cooking Steps</h3>
                    <ol>
                        ${data.cookingSteps.map(step => `<li>${step}</li>`).join('')}
                    </ol>
                </div>
            `;
        }
        
        // Add modifications if they exist
        if (data.modifications) {
            modalContent += `
                <div class="modal-section">
                    <h3>Possible Modifications</h3>
                    <p>${data.modifications}</p>
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
        
        // Fallback to old format for non-recipe modals
        if (data.details && !data.ingredients) {
            modalContent += `
            <h3>Details:</h3>
            <ul>
                ${data.details.map(detail => `<li>${detail}</li>`).join('')}
            </ul>
        `;
        }
        
        modalBody.innerHTML = modalContent;
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
}

function closeModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Restore scrolling
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
        // Create dots
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

function updatePaginationDots(containerId) {
    const container = document.getElementById(containerId + '-container');
    const dotsContainer = document.getElementById(containerId + '-dots');
    
    if (!container || !dotsContainer) return;
    
    const dots = dotsContainer.querySelectorAll('.pagination-dot');
    const currentPosition = cardSliderPositions[containerId] || 0;
    
    // For one-card-at-a-time scrolling, position directly corresponds to page index
    const activeDotIndex = currentPosition;
    
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === activeDotIndex);
    });
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
