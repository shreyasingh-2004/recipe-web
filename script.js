document.addEventListener('DOMContentLoaded', function () {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', function () {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function () {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Recipe modal functionality
    const recipeCards = document.querySelectorAll('.recipe-card');
    const modal = document.querySelector('.recipe-modal');
    const closeModal = document.querySelector('.close-modal');
    const modalTitle = document.querySelector('.modal-title');
    const modalImage = document.querySelector('.modal-image' || '');
    const ingredientsList = document.querySelector('.ingredients-list');
    const instructionsList = document.querySelector('.instructions-list');

    // Recipe data
    const recipes = {
        'halwa': {
            title: 'Sooji Halwa',
            ingredients: [
                '1 cup sooji (semolina)',
                '¾ cup sugar',
                '2½ cups water',
                '¼ cup ghee',
                '2 tbsp chopped cashews',
                '2 tbsp raisins',
                '½ tsp cardamom powder',
                'A few saffron strands (optional)'
            ],
            instructions: [
                'Heat ghee in a pan, fry cashews and raisins until golden. Remove and set aside.',
                'Add sooji to the remaining ghee and roast until light golden and aromatic.',
                'In another pan, heat water and dissolve sugar with cardamom powder.',
                'Carefully pour the hot sugar syrup into the roasted sooji, stirring continuously.',
                'Add the fried cashews, raisins, and saffron (if using).',
                'Cook until the halwa thickens and ghee starts separating.',
                'Serve warm, garnished with extra nuts if desired.'
            ]
        },
        'kadhai-paneer': {
            title: 'Kadhai Paneer',
            images: 'img/kadhai_Paneer.webp',
            ingredients: [
                '250g paneer, cubed',
                '1 capsicum, diced',
                '1 onion, diced',
                '2 tomatoes, pureed',
                '1 tbsp ginger-garlic paste',
                '1 tsp cumin seeds',
                '1 tbsp coriander powder',
                '1 tsp garam masala',
                '1 tsp red chili powder',
                '1/2 tsp turmeric powder',
                '1 tsp kasuri methi (dried fenugreek leaves)',
                '2 tbsp oil',
                'Salt to taste',
                'Fresh coriander leaves for garnish'
            ],
            instructions: [
                'Heat oil in a kadhai or pan, add cumin seeds and let them splutter.',
                'Add diced onions and sauté until translucent.',
                'Add ginger-garlic paste and sauté for a minute until raw smell disappears.',
                'Add tomato puree and cook until oil separates from the masala.',
                'Add all dry spices (coriander powder, garam masala, red chili powder, turmeric) and salt. Mix well.',
                'Add diced capsicum and cook for 2-3 minutes while maintaining crunch.',
                'Add paneer cubes and gently mix, being careful not to break them.',
                'Crush kasuri methi between your palms and add to the dish.',
                'Garnish with fresh coriander leaves and serve hot with naan or roti.'
            ]
        },
        // Add other recipes similarly
        'rajma-chawal': {
            title: 'Rajma Chawal',
            ingredients: [
                '1 cup rajma (kidney beans), soaked overnight',
                '2 onions, finely chopped',
                '2 tomatoes, pureed',
                '1 tbsp ginger-garlic paste',
                '1 tsp cumin seeds',
                '1 tsp turmeric powder',
                '1 tsp red chili powder',
                '1 tsp coriander powder',
                '1 tsp garam masala',
                '2 tbsp oil/ghee',
                'Salt to taste',
                'Fresh coriander leaves for garnish',
                '2 cups rice, cooked'
            ],
            instructions: [
                'Pressure cook soaked rajma with enough water and salt until soft (about 4-5 whistles).',
                'Heat oil/ghee in a pan, add cumin seeds and let them splutter.',
                'Add chopped onions and sauté until golden brown.',
                'Add ginger-garlic paste and sauté for a minute.',
                'Add tomato puree and cook until oil separates.',
                'Add all dry spices and cook for another minute.',
                'Add cooked rajma along with its water and simmer for 15-20 minutes.',
                'Mash some rajma with the back of spoon to thicken the gravy.',
                'Garnish with fresh coriander leaves and serve hot with steamed rice.'
            ]
        },
        'kadhi-pakoda': {
            title: 'Kadhi Pakoda',
            ingredients: [
                '1 cup besan (gram flour)',
                '1/2 cup yogurt',
                '4 cups water',
                '1 onion, finely chopped (for pakodas)',
                '1 tsp red chili powder',
                '1/2 tsp turmeric powder',
                '1 tsp coriander powder',
                '1 tsp cumin seeds',
                '1 tsp mustard seeds',
                '1/2 tsp fenugreek seeds',
                '2 dry red chilies',
                '10-12 curry leaves',
                '2 tbsp oil/ghee',
                'Salt to taste',
                'Fresh coriander leaves for garnish'
            ],
            instructions: [
                'For pakodas: Mix 1/2 cup besan, chopped onion, salt, and water to make thick batter.',
                'Heat oil and drop small portions of batter to make pakodas. Fry until golden and keep aside.',
                'For kadhi: Whisk yogurt with remaining besan and water to make smooth mixture.',
                'Heat oil in a kadhai, add cumin, mustard, fenugreek seeds, dry red chilies, and curry leaves.',
                'Let the spices crackle, then add the besan-yogurt mixture, stirring continuously.',
                'Add turmeric, red chili, coriander powder, and salt. Bring to boil while stirring.',
                'Simmer for 20-25 minutes until kadhi thickens.',
                'Add fried pakodas just before serving and simmer for 2-3 minutes.',
                'Garnish with fresh coriander leaves and serve hot with rice.'
            ]
        },
        'tandoori': {
            title: 'Tandoori Chicken',
            ingredients: [
                '1 kg chicken, cut into pieces',
                '1 cup yogurt',
                '2 tbsp lemon juice',
                '2 tbsp tandoori masala',
                '1 tbsp ginger-garlic paste',
                '1 tsp red chili powder',
                '1 tsp turmeric powder',
                '1 tsp garam masala',
                'Salt to taste',
                '2 tbsp oil',
                '1 tsp chaat masala',
                'Lemon wedges and onion rings for garnish'
            ],
            instructions: [
                'Clean and pat dry the chicken pieces.',
                'In a large bowl, mix yogurt, lemon juice, tandoori masala, ginger-garlic paste, chili powder, turmeric, garam masala, salt, and oil.',
                'Add the chicken pieces to the marinade and coat well. Cover and refrigerate for at least 4 hours or overnight.',
                'Preheat the oven to 200°C (400°F). Line a baking tray with foil and place a wire rack over it.',
                'Place the marinated chicken on the rack and bake for 30–35 minutes, turning halfway, until cooked through and slightly charred.',
                'Sprinkle chaat masala over the hot chicken.',
                'Serve with lemon wedges and onion rings.'
            ]
        },
        'pasta': {
            title: 'Pasta',
            ingredients: [
                '200g pasta (penne, spaghetti, or your choice)',
                '2 tbsp olive oil',
                '3 garlic cloves, minced',
                '1 onion, finely chopped',
                '1 bell pepper, diced',
                '1 cup mushrooms, sliced',
                '1 cup tomato puree',
                '1 tsp dried oregano',
                '1 tsp dried basil',
                '1/2 tsp red chili flakes',
                'Salt and pepper to taste',
                'Grated parmesan cheese for garnish',
                'Fresh basil leaves for garnish'
            ],
            instructions: [
                'Cook pasta according to package instructions until al dente. Drain and set aside.',
                'Heat olive oil in a pan, add minced garlic and sauté for 30 seconds.',
                'Add chopped onion and sauté until translucent.',
                'Add bell pepper and mushrooms, cook until vegetables are tender.',
                'Add tomato puree and all seasonings (oregano, basil, chili flakes, salt, pepper).',
                'Simmer the sauce for 5-7 minutes until slightly thickened.',
                'Add cooked pasta to the sauce and toss well to combine.',
                'Garnish with grated parmesan and fresh basil leaves before serving.'
            ]
        },
        'chowmein': {
            title: 'Chowmein',
            ingredients: [
                '200g noodles',
                '2 tbsp vegetable oil',
                '2 garlic cloves, minced',
                '1 inch ginger, julienned',
                '1 onion, sliced',
                '1 carrot, julienned',
                '1 bell pepper, sliced',
                '1 cup cabbage, shredded',
                '2 tbsp soy sauce',
                '1 tbsp vinegar',
                '1 tsp red chili sauce',
                '1 tsp sugar',
                'Salt and pepper to taste',
                'Spring onions for garnish'
            ],
            instructions: [
                'Cook noodles according to package instructions. Drain and rinse with cold water. Toss with 1 tsp oil to prevent sticking.',
                'Heat oil in a wok or large pan on high heat.',
                'Add garlic and ginger, stir for 30 seconds until fragrant.',
                'Add onion and stir-fry for 1 minute.',
                'Add carrot, bell pepper, and cabbage. Stir-fry for 2-3 minutes until vegetables are crisp-tender.',
                'Push vegetables to one side, add noodles to the wok.',
                'Add soy sauce, vinegar, chili sauce, sugar, salt, and pepper. Toss everything together for 1-2 minutes.',
                'Garnish with chopped spring onions and serve hot.'
            ]
        },
        'burger': {
            title: 'Burger',
            ingredients: [
                '2 burger buns',
                '200g minced chicken/beef (or veg patty)',
                '1 tsp garlic powder',
                '1 tsp onion powder',
                '1 tsp paprika',
                'Salt and pepper to taste',
                '1 tbsp oil',
                '2 cheese slices',
                'Lettuce leaves',
                'Tomato slices',
                'Onion slices',
                'Pickle slices',
                'Ketchup and mayonnaise'
            ],
            instructions: [
                'Mix minced meat with garlic powder, onion powder, paprika, salt, and pepper. Form into patties.',
                'Heat oil in a pan and cook patties for 4-5 minutes per side until fully cooked.',
                'In the last minute of cooking, place cheese slice on each patty to melt.',
                'Toast the burger buns lightly.',
                'Assemble burger: bottom bun, lettuce, patty with cheese, tomato, onion, pickles, sauces, and top bun.',
                'Serve immediately with fries or salad.'
            ]
        },
        'momos': {
            title: 'Momos',
            ingredients: [
                '2 cups all-purpose flour',
                '1/2 cup water (for dough)',
                '200g minced chicken/cabbage-carrot (for veg)',
                '1 onion, finely chopped',
                '2 garlic cloves, minced',
                '1 inch ginger, grated',
                '1 tbsp soy sauce',
                '1 tsp vinegar',
                '1 tsp red chili powder',
                'Salt to taste',
                'Oil for greasing'
            ],
            instructions: [
                'For dough: Mix flour with water and knead into stiff dough. Cover and rest for 30 minutes.',
                'For filling: Mix all filling ingredients well in a bowl.',
                'Divide dough into small balls and roll into thin circles (4-5 inch diameter).',
                'Place spoonful of filling in center and pleat the edges to seal the momo.',
                'Grease steamer plate and arrange momos leaving space between them.',
                'Steam for 10-12 minutes until cooked.',
                'Serve hot with spicy tomato chutney or schezwan sauce.'
            ]
        }
    };

    // Show modal with recipe details
    recipeCards.forEach(card => {
        card.addEventListener('click', function () {
            const recipeId = this.getAttribute('data-recipe');
            const recipe = recipes[recipeId];

            modalTitle.textContent = recipe.title;
            modalImage.src = ''; // You can replace this with specific image paths

            // Clear previous ingredients and instructions
            ingredientsList.innerHTML = '';
            instructionsList.innerHTML = '';

            // Add ingredients
            recipe.ingredients.forEach(ingredient => {
                const li = document.createElement('li');
                li.textContent = ingredient;
                ingredientsList.appendChild(li);
            });

            // Add instructions
            recipe.instructions.forEach(instruction => {
                const li = document.createElement('li');
                li.textContent = instruction;
                instructionsList.appendChild(li);
            });

            // Show modal
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    });

    // Close modal
    closeModal.addEventListener('click', function () {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    // Close modal when clicking outside
    window.addEventListener('click', function (event) {
        if (event.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Explore button scroll to Indian cuisine
    const exploreBtn = document.querySelector('.explore-btn');
    if (exploreBtn) {
        exploreBtn.addEventListener('click', function () {
            const indianSection = document.querySelector('#indian');
            if (indianSection) {
                window.scrollTo({
                    top: indianSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    }
});