document.addEventListener("DOMContentLoaded", function () 
{
  // Mobile menu toggle
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  hamburger.addEventListener("click", function () {
    this.classList.toggle("active");
    navLinks.classList.toggle("active");
  });

  // Close mobile menu when clicking on a link
  const navItems = document.querySelectorAll(".nav-links a");
  navItems.forEach((item) => {
    item.addEventListener("click", function () {
      hamburger.classList.remove("active");
      navLinks.classList.remove("active");
    });
  });

  // Recipe modal functionality
  const recipeCards = document.querySelectorAll(".recipe-card");
  const modal = document.querySelector(".recipe-modal");
  const closeModal = document.querySelector(".close-modal");
  const modalTitle = document.querySelector(".modal-title");
  const modalImage = document.querySelector(".modal-image");
  const ingredientsList = document.querySelector(".ingredients-list");
  const instructionsList = document.querySelector(".instructions-list");

  // Recipe data
  const recipes = {
    'dosa': {
      title: "Crispy Dosa",
      image:"img/dosa.jpg",
      ingredients: [
        "1 cup rice",
        "¼ cup urad dal (split black gram)",
        "2 tbsp poha (flattened rice)",
        "Salt to taste",
        "Water as needed",
        "Oil or ghee for cooking",
      ],
      instructions: [
        "Rinse rice, urad dal, and poha separately. Soak them in water for 4–6 hours.",
        "Grind the soaked ingredients together into a smooth batter, adding water as needed.",
        "Add salt, mix well, and let the batter ferment overnight or for 8–12 hours in a warm place.",
        "Once fermented, stir the batter gently. Heat a non-stick or cast-iron tawa.",
        "Pour a ladle of batter in the center and spread it in a circular motion to make a thin dosa.",
        "Drizzle oil or ghee around the edges and cook on medium heat until crisp and golden.",
        "Fold and serve hot with coconut chutney and sambar.",
      ],
    },
    "kadhai-paneer": {
      title: "Kadhai Paneer",
      image:"img/Kadhai_Paneer.webp",
      ingredients: [
        "250g paneer, cubed",
        "1 capsicum, diced",
        "1 onion, diced",
        "2 tomatoes, pureed",
        "1 tbsp ginger-garlic paste",
        "1 tsp cumin seeds",
        "1 tbsp coriander powder",
        "1 tsp garam masala",
        "1 tsp red chili powder",
        "1/2 tsp turmeric powder",
        "1 tsp kasuri methi (dried fenugreek leaves)",
        "2 tbsp oil",
        "Salt to taste",
        "Fresh coriander leaves for garnish",
      ],
      instructions: [
        "Heat oil in a kadhai or pan, add cumin seeds and let them splutter.",
        "Add diced onions and sauté until translucent.",
        "Add ginger-garlic paste and sauté for a minute until raw smell disappears.",
        "Add tomato puree and cook until oil separates from the masala.",
        "Add all dry spices (coriander powder, garam masala, red chili powder, turmeric) and salt. Mix well.",
        "Add diced capsicum and cook for 2-3 minutes while maintaining crunch.",
        "Add paneer cubes and gently mix, being careful not to break them.",
        "Crush kasuri methi between your palms and add to the dish.",
        "Garnish with fresh coriander leaves and serve hot with naan or roti.",
      ],
    },
    // Add other recipes similarly
    "rajma-chawal": {
      title: "Rajma Chawal",
      image: "img/rajma-chawal.jpeg",
      ingredients: [
        "1 cup rajma (kidney beans), soaked overnight",
        "2 onions, finely chopped",
        "2 tomatoes, pureed",
        "1 tbsp ginger-garlic paste",
        "1 tsp cumin seeds",
        "1 tsp turmeric powder",
        "1 tsp red chili powder",
        "1 tsp coriander powder",
        "1 tsp garam masala",
        "2 tbsp oil/ghee",
        "Salt to taste",
        "Fresh coriander leaves for garnish",
        "2 cups rice, cooked",
      ],
      instructions: [
        "Pressure cook soaked rajma with enough water and salt until soft (about 4-5 whistles).",
        "Heat oil/ghee in a pan, add cumin seeds and let them splutter.",
        "Add chopped onions and sauté until golden brown.",
        "Add ginger-garlic paste and sauté for a minute.",
        "Add tomato puree and cook until oil separates.",
        "Add all dry spices and cook for another minute.",
        "Add cooked rajma along with its water and simmer for 15-20 minutes.",
        "Mash some rajma with the back of spoon to thicken the gravy.",
        "Garnish with fresh coriander leaves and serve hot with steamed rice.",
      ],
    },
    'kadhi-pakoda': {
      title: "Kadhi Pakoda",
      image:"img/Kadhi-pakora.jpg",
      ingredients: [
        "1 cup besan (gram flour)",
        "1/2 cup yogurt",
        "4 cups water",
        "1 onion, finely chopped (for pakodas)",
        "1 tsp red chili powder",
        "1/2 tsp turmeric powder",
        "1 tsp coriander powder",
        "1 tsp cumin seeds",
        "1 tsp mustard seeds",
        "1/2 tsp fenugreek seeds",
        "2 dry red chilies",
        "10-12 curry leaves",
        "2 tbsp oil/ghee",
        "Salt to taste",
        "Fresh coriander leaves for garnish",
      ],
      instructions: [
        "For pakodas: Mix 1/2 cup besan, chopped onion, salt, and water to make thick batter.",
        "Heat oil and drop small portions of batter to make pakodas. Fry until golden and keep aside.",
        "For kadhi: Whisk yogurt with remaining besan and water to make smooth mixture.",
        "Heat oil in a kadhai, add cumin, mustard, fenugreek seeds, dry red chilies, and curry leaves.",
        "Let the spices crackle, then add the besan-yogurt mixture, stirring continuously.",
        "Add turmeric, red chili, coriander powder, and salt. Bring to boil while stirring.",
        "Simmer for 20-25 minutes until kadhi thickens.",
        "Add fried pakodas just before serving and simmer for 2-3 minutes.",
        "Garnish with fresh coriander leaves and serve hot with rice.",
      ],
    },
    'Chilli potato': {
      title: "Chilli Potato",
      image: "img/chilly-potato.webp",
      description:
        "Crispy fried potatoes tossed in a spicy Indo-Chinese sauce.",
      ingredients: [
        "3 large potatoes, peeled and cut into wedges or fingers",
        "3 tbsp cornflour",
        "2 tbsp all-purpose flour",
        "Salt to taste",
        "1/2 tsp black pepper",
        "Oil for deep frying",
        "1 tbsp oil (for sauce)",
        "1 tbsp garlic, finely chopped",
        "1 tbsp ginger, finely chopped",
        "2 green chilies, slit or chopped",
        "1 onion, chopped into cubes",
        "1/2 green capsicum, cubed",
        "2 tbsp soy sauce",
        "1 tbsp chili sauce",
        "1 tbsp tomato ketchup",
        "1 tsp vinegar",
        "1 tsp sugar",
        "2 tbsp water (to adjust sauce)",
        "Spring onions for garnish",
      ],
      instructions: [
        "Boil the potato wedges for 4–5 minutes, then drain and pat dry.",
        "Coat them in cornflour, flour, salt, and pepper.",
        "Deep fry until golden and crispy. Set aside.",
        "In a pan, heat 1 tbsp oil. Add garlic, ginger, green chilies, and sauté briefly.",
        "Add onion and capsicum; stir-fry for 2 minutes.",
        "Mix soy sauce, chili sauce, ketchup, vinegar, sugar, and a bit of water to make a sauce.",
        "Add fried potatoes and toss well in the sauce until coated.",
        "Garnish with spring onions and serve hot.",
      ],
    },
    'Noodles': {
      title: "Veg Noodles",
      image:"img/noodles.webp",
      ingredients: [
        "200g noodles",
        "2 tbsp oil",
        "1 tbsp finely chopped garlic",
        "1 tbsp finely chopped ginger",
        "1 green chili, sliced (optional)",
        "½ cup sliced onions",
        "½ cup sliced bell peppers (any color)",
        "½ cup shredded cabbage",
        "¼ cup julienned carrots",
        "2 tbsp soy sauce",
        "1 tbsp vinegar",
        "1 tbsp chili sauce (adjust to taste)",
        "1 tsp black pepper powder",
        "Salt to taste",
        "Spring onions for garnish",
      ],
      instructions: [
        "Boil noodles according to package instructions. Drain, rinse with cold water, and toss with a little oil to prevent sticking. Set aside.",
        "Heat oil in a wok or large pan on high heat.",
        "Add garlic, ginger, and green chili. Sauté for a few seconds until fragrant.",
        "Add onions, bell peppers, cabbage, and carrots. Stir-fry on high heat for 2–3 minutes.",
        "Add the cooked noodles to the pan and toss everything together.",
        "Pour in soy sauce, vinegar, chili sauce, black pepper, and salt. Mix well.",
        "Stir-fry for another 2 minutes until everything is well combined and heated through.",
        "Garnish with chopped spring onions and serve hot.",
      ],
    },
    'burger': {
      title: "Burger",
      image:"img/burger.jpg",
      ingredients: [
        "2 burger buns",
        "200g minced chicken/beef (or veg patty)",
        "1 tsp garlic powder",
        "1 tsp onion powder",
        "1 tsp paprika",
        "Salt and pepper to taste",
        "1 tbsp oil",
        "2 cheese slices",
        "Lettuce leaves",
        "Tomato slices",
        "Onion slices",
        "Pickle slices",
        "Ketchup and mayonnaise",
      ],
      instructions: [
        "Mix minced meat with garlic powder, onion powder, paprika, salt, and pepper. Form into patties.",
        "Heat oil in a pan and cook patties for 4-5 minutes per side until fully cooked.",
        "In the last minute of cooking, place cheese slice on each patty to melt.",
        "Toast the burger buns lightly.",
        "Assemble burger: bottom bun, lettuce, patty with cheese, tomato, onion, pickles, sauces, and top bun.",
        "Serve immediately with fries or salad.",
      ],
    },
    'momos': {
      title: "Momos",
      image:"img/momos.webp",
      ingredients: [
        "2 cups all-purpose flour",
        "1/2 cup water (for dough)",
        "200g minced chicken/cabbage-carrot (for veg)",
        "1 onion, finely chopped",
        "2 garlic cloves, minced",
        "1 inch ginger, grated",
        "1 tbsp soy sauce",
        "1 tsp vinegar",
        "1 tsp red chili powder",
        "Salt to taste",
        "Oil for greasing",
      ],
      instructions: [
        "For dough: Mix flour with water and knead into stiff dough. Cover and rest for 30 minutes.",
        "For filling: Mix all filling ingredients well in a bowl.",
        "Divide dough into small balls and roll into thin circles (4-5 inch diameter).",
        "Place spoonful of filling in center and pleat the edges to seal the momo.",
        "Grease steamer plate and arrange momos leaving space between them.",
        "Steam for 10-12 minutes until cooked.",
        "Serve hot with spicy tomato chutney or schezwan sauce.",
      ],
    },
    'pasta': {
      title: "Pasta",
      image:"img/pasta.jpeg",
      ingredients: [
        "200g pasta (penne, spaghetti, or your choice)",
        "2 tbsp olive oil",
        "3 garlic cloves, minced",
        "1 onion, finely chopped",
        "1 bell pepper, diced",
        "1 cup mushrooms, sliced",
        "1 cup tomato puree",
        "1 tsp dried oregano",
        "1 tsp dried basil",
        "1/2 tsp red chili flakes",
        "Salt and pepper to taste",
        "Grated parmesan cheese for garnish",
        "Fresh basil leaves for garnish",
      ],
      instructions: [
        "Cook pasta according to package instructions until al dente. Drain and set aside.",
        "Heat olive oil in a pan, add minced garlic and sauté for 30 seconds.",
        "Add chopped onion and sauté until translucent.",
        "Add bell pepper and mushrooms, cook until vegetables are tender.",
        "Add tomato puree and all seasonings (oregano, basil, chili flakes, salt, pepper).",
        "Simmer the sauce for 5-7 minutes until slightly thickened.",
        "Add cooked pasta to the sauce and toss well to combine.",
        "Garnish with grated parmesan and fresh basil leaves before serving.",
      ],
    },
    'pizza': {
      title: "Pizza",
      image: "img/pizza.avif",
      ingredients: [
        "1 pizza base (store-bought or homemade)",
        "½ cup pizza sauce",
        "1 cup shredded mozzarella cheese",
        "½ cup sliced onions",
        "½ cup bell peppers (red/green/yellow)",
        "¼ cup sliced olives",
        "¼ cup sweet corn (optional)",
        "1 tsp chili flakes",
        "1 tsp mixed Italian herbs or oregano",
        "Salt to taste",
        "Olive oil for brushing",
      ],
      instructions: [
        "Preheat oven to 220°C (425°F).",
        "Place the pizza base on a baking tray.",
        "Spread a layer of pizza sauce evenly over the base.",
        "Add vegetables: onions, bell peppers, olives, corn, and any other toppings of choice.",
        "Sprinkle mozzarella cheese generously on top.",
        "Sprinkle herbs, chili flakes, and a pinch of salt.",
        "Drizzle a little olive oil over the top.",
        "Bake in the oven for 12–15 minutes or until the crust is golden and cheese is melted and bubbly.",
        "Slice and serve hot.",
      ],
    },
    'Garlic bread': {
      title: "Garlic Bread",
      image:"img/garlic-bread.cms",
      ingredients: [
        "1 baguette or French bread loaf",
        "4 tbsp butter, softened",
        "3–4 cloves garlic, minced",
        "1 tbsp fresh parsley, chopped",
        "½ tsp dried oregano (optional)",
        "Salt to taste",
        "Grated mozzarella or parmesan cheese (optional)",
      ],
      instructions: [
        "Preheat your oven to 180°C (350°F).",
        "Cut the baguette into slices or halve lengthwise.",
        "In a bowl, mix softened butter, minced garlic, parsley, oregano, and a pinch of salt.",
        "Spread the garlic butter mixture evenly over the bread.",
        "Sprinkle cheese on top if desired.",
        "Place the bread on a baking sheet and bake for 10–12 minutes until golden and crispy.",
        "Serve hot as an appetizer or side.",
      ],
    },
    'halwa': {
      title: "Sooji Halwa",
      image: "img/halwa.jpg",
      description:
        "A traditional Indian sweet made with semolina, ghee, and sugar, flavored with cardamom and garnished with nuts.",
      ingredients: [
        "1 cup sooji (semolina)",
        "3/4 cup sugar (adjust to taste)",
        "1/2 cup ghee",
        "2.5 cups water",
        "1/2 tsp cardamom powder",
        "10-12 cashews",
        "10-12 raisins",
        "2 tbsp chopped almonds (optional)",
        "A few strands of saffron (optional)",
      ],
      instructions: [
        "Heat ghee in a pan and roast cashews and raisins until golden. Remove and set aside.",
        "In the same ghee, add sooji and roast on low flame until it turns golden brown and aromatic.",
        "In a separate pan, bring water and sugar to a boil. Add saffron and cardamom powder.",
        "Carefully pour the hot sugar water into the roasted sooji while stirring constantly.",
        "Cook on low heat, stirring continuously, until the mixture thickens and leaves the sides of the pan.",
        "Garnish with fried cashews, raisins, and almonds. Serve warm.",
      ],
    },
    'Kaju barfi': {
      title: "Kaju Barfi",
      image:"img/Kaju-barfi.jpg",
      ingredients: [
        "1 cup cashew nuts (kaju)",
        "½ cup sugar",
        "¼ cup water",
        "½ tsp cardamom powder",
        "1 tsp ghee",
        "Silver leaf (optional)",
      ],
      instructions: [
        "Grind cashew nuts to a fine powder without over-blending.",
        "In a pan, add sugar and water. Cook on medium heat until sugar dissolves.",
        "Add cashew powder and stir continuously to avoid lumps.",
        "Cook on low heat until the mixture thickens and forms a dough-like consistency.",
        "Turn off the heat, add cardamom powder and ghee, mix well.",
        "Transfer the mixture onto a greased surface and roll it flat using a greased rolling pin.",
        "Apply silver leaf if desired, then cut into diamond shapes.",
        "Cool and store in an airtight container.",
      ],
    },

    'Rasmalai': {
      title: "Rasmalai",
      image:"img/rasmalai.webp",
      ingredients: [
        "10 rasgullas (store-bought or homemade)",
        "1 liter full cream milk",
        "½ cup sugar",
        "¼ tsp cardamom powder",
        "10–12 saffron strands",
        "2 tbsp chopped pistachios",
        "2 tbsp chopped almonds",
      ],
      instructions: [
        "Boil milk in a heavy-bottomed pan. Simmer and reduce it to ¾ of its original quantity.",
        "Add sugar, cardamom powder, and saffron. Stir and cook for 5 more minutes.",
        "Squeeze the syrup from rasgullas gently and flatten slightly.",
        "Add the rasgullas into the thickened milk and simmer for 5–7 minutes.",
        "Turn off the heat, add chopped nuts, and let it cool.",
        "Refrigerate for a few hours and serve chilled.",
      ],
    },

    'Gulab jamun': {
      title: "Gulab Jamun",
      image:"img/gulab-jamun.jpg",
      ingredients: [
        "1 cup khoya (mawa), grated",
        "¼ cup all-purpose flour (maida)",
        "1 tbsp semolina (sooji)",
        "¼ tsp baking soda",
        "2–3 tbsp milk (as needed)",
        "Ghee or oil for frying",
        "1½ cups sugar",
        "1½ cups water",
        "4–5 cardamom pods",
        "Few drops of rose water or saffron strands (optional)",
      ],
      instructions: [
        "Mix khoya, maida, semolina, baking soda, and milk to make a smooth soft dough.",
        "Rest the dough for 10 minutes, then divide and roll into small balls without cracks.",
        "In a pan, make sugar syrup by boiling water, sugar, and cardamom. Add rose water or saffron if using. Keep it warm.",
        "Heat ghee/oil on medium-low. Fry the balls until golden brown evenly.",
        "Immediately transfer hot fried balls into the warm sugar syrup.",
        "Soak for at least 1 hour before serving.",
        "Serve warm or chilled, as desired.",
      ],
    },
    'tandoori': {
      title: "Tandoori Chicken",
      image:"img/tandoori-chicken.jpg",
      ingredients: [
        "1 kg chicken, cut into pieces",
        "1 cup yogurt",
        "2 tbsp lemon juice",
        "2 tbsp tandoori masala",
        "1 tbsp ginger-garlic paste",
        "1 tsp red chili powder",
        "1 tsp turmeric powder",
        "1 tsp garam masala",
        "Salt to taste",
        "2 tbsp oil",
        "1 tsp chaat masala",
        "Lemon wedges and onion rings for garnish",
      ],
      instructions: [
        "Clean and pat dry the chicken pieces.",
        "In a large bowl, mix yogurt, lemon juice, tandoori masala, ginger-garlic paste, chili powder, turmeric, garam masala, salt, and oil.",
        "Add the chicken pieces to the marinade and coat well. Cover and refrigerate for at least 4 hours or overnight.",
        "Preheat the oven to 200°C (400°F). Line a baking tray with foil and place a wire rack over it.",
        "Place the marinated chicken on the rack and bake for 30–35 minutes, turning halfway, until cooked through and slightly charred.",
        "Sprinkle chaat masala over the hot chicken.",
        "Serve with lemon wedges and onion rings.",
      ],
    },
    'Egg roll': {
      title: "Egg Roll",
      image:"img/egg-roll.jpg",
      ingredients: [
        "2 flour parathas or wraps",
        "2 eggs",
        "½ cup sliced onions",
        "½ cup sliced cucumbers",
        "1 small carrot, julienned (optional)",
        "1 green chili, chopped (optional)",
        "2 tbsp chopped coriander leaves",
        "Salt and pepper to taste",
        "Tomato ketchup and green chutney",
        "1 tbsp oil or butter for frying",
      ],
      instructions: [
        "Heat oil in a pan and lightly toast the parathas on both sides. Set aside.",
        "Crack one egg into a bowl, add salt and pepper, and beat well.",
        "Pour the egg onto the hot pan, then immediately place a paratha over it and press gently.",
        "Flip and cook for a few seconds until egg is done. Repeat with the second paratha.",
        "Remove from heat, place on a plate, and top with onions, cucumbers, carrots, green chili, coriander, and sauces.",
        "Roll it up tightly and serve hot.",
      ],
    },
    'Chilli chicken': {
      title: "Chilli Chicken (Dry)",
      image:"img/chilli-chicken.jpg",
      ingredients: [
        "500g boneless chicken, cut into small pieces",
        "1 egg",
        "3 tbsp cornflour",
        "2 tbsp all-purpose flour (maida)",
        "1 tbsp soy sauce",
        "1 tsp ginger-garlic paste",
        "Salt and pepper to taste",
        "Oil for deep frying",
        "1 onion, cubed",
        "1 bell pepper, cubed",
        "2–3 green chilies, slit",
        "1 tbsp chopped garlic",
        "2 tbsp soy sauce",
        "1 tbsp chili sauce",
        "1 tbsp vinegar",
        "1 tsp sugar",
        "Spring onions for garnish",
      ],
      instructions: [
        "In a bowl, mix chicken, egg, cornflour, maida, soy sauce, ginger-garlic paste, salt, and pepper. Marinate for 30 minutes.",
        "Deep-fry the chicken until golden and crisp. Set aside.",
        "In a wok, heat 2 tbsp oil. Sauté garlic, green chilies, onions, and bell peppers for 2–3 minutes.",
        "Add soy sauce, chili sauce, vinegar, and sugar. Mix well.",
        "Add the fried chicken and toss until coated and heated through.",
        "Garnish with spring onions and serve hot.",
      ],
    },

    'Fish fingers': {
      title: "Fish Fingers",
      image:"img/fish-fingers.jpg",
      ingredients: [
        "300g boneless fish fillets (like basa or cod), cut into finger-sized strips",
        "1 tsp lemon juice",
        "1 tsp ginger-garlic paste",
        "Salt and pepper to taste",
        "½ tsp paprika or red chili powder",
        "1 egg, beaten",
        "½ cup breadcrumbs",
        "¼ cup all-purpose flour",
        "Oil for deep frying",
      ],
      instructions: [
        "Marinate the fish strips with lemon juice, ginger-garlic paste, salt, pepper, and paprika. Rest for 15–20 minutes.",
        "Dredge each strip in flour, dip in beaten egg, and then coat with breadcrumbs.",
        "Heat oil in a deep pan. Fry the fish fingers in batches until golden and crispy.",
        "Drain on paper towels and serve hot with tartar sauce or ketchup.",
      ],
    }
  };

  // Show modal with recipe details
  recipeCards.forEach((card) => {
    card.addEventListener("click", function () {
      const recipeId = this.getAttribute("data-recipe");
      const recipe = recipes[recipeId];

      modalTitle.textContent = recipe.title;
      modalImage.src =recipe.image; // You can replace this with specific image paths

      // Clear previous ingredients and instructions
      ingredientsList.innerHTML = "";
      instructionsList.innerHTML = "";

      // Add ingredients
      recipe.ingredients.forEach((ingredient) => {
        const li = document.createElement("li");
        li.textContent = ingredient;
        ingredientsList.appendChild(li);
      });

      // Add instructions
      recipe.instructions.forEach((instruction) => {
        const li = document.createElement("li");
        li.textContent = instruction;
        instructionsList.appendChild(li);
      });

      // Show modal
      modal.style.display = "block";
      document.body.style.overflow = "hidden";
    });
  });

  // Close modal
  closeModal.addEventListener("click", function () {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  });

  // Close modal when clicking outside
  window.addEventListener("click", function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
      document.body.style.overflow = "auto";
    }
  });

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        });
      }
    });
  });

  // Explore button scroll to Indian cuisine
  const exploreBtn = document.querySelector(".explore-btn");
  if (exploreBtn) {
    exploreBtn.addEventListener("click", function () {
      const indianSection = document.querySelector("#indian");
      if (indianSection) {
        window.scrollTo({
          top: indianSection.offsetTop - 80,
          behavior: "smooth",
        });
      }
    });
  }
});
