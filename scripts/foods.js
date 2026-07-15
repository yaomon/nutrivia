let foods = [
    {
        name: "advocado-half.png",
        displayName: "Half Avocado",
        description:
            "A half avocado—almost perfect, just needs its other half.",
        rarity: 4,
    },
    {
        name: "apple-half.png",
        displayName: "Half Apple",
        description:
            "A juicy half apple—crisp and refreshing, but missing its other half.",
        rarity: 4,
    },
    {
        name: "apple.png",
        displayName: "Apple",
        description:
            "The classic fruit—sweet, crisp, and always a healthy choice.",
        rarity: 3,
    },
    {
        name: "avocado.png",
        displayName: "Avocado",
        description:
            "Smooth and creamy. A favorite for those who love a bit of green.",
        rarity: 3,
    },
    {
        name: "bacon-raw.png",
        displayName: "Raw Bacon",
        description:
            "Raw and ready to sizzle—unappetizing and a little greasy!",
        rarity: 1,
    },
    {
        name: "bacon.png",
        displayName: "Bacon",
        description:
            "Crispy, salty strips of heaven—perfect for breakfast or as a topping.",
        rarity: 4,
    },
    {
        name: "bag-flat.png",
        displayName: "Flat Bag",
        description:
            "An empty bag, flat and unremarkable—what's inside could be a surprise!",
        rarity: 1,
    },
    {
        name: "bag.png",
        displayName: "Bag",
        description:
            "A generic bag, waiting to be filled with goodies or groceries.",
        rarity: 2,
    },
    {
        name: "banana.png",
        displayName: "Banana",
        description:
            "Peel it and go bananas—an easy snack with a touch of tropical flavor.",
        rarity: 2,
    },
    {
        name: "barrel.png",
        displayName: "Barrel",
        description:
            "Not quite food, but full of potential. Maybe it's holding something delicious inside!",
        rarity: 3,
    },
    {
        name: "beet.png",
        displayName: "Beet",
        description:
            "Earthy and vibrant—perfect for adding a splash of color to your plate.",
        rarity: 5,
    },
    {
        name: "bottle-ketchup.png",
        displayName: "Ketchup",
        description:
            "The perfect condiment for your burgers and fries—squeezable and tangy.",
        rarity: 4,
    },
    {
        name: "bottle-musterd.png",
        displayName: "Mustard",
        description:
            "Spicy and tangy, this mustard is a must-have for adding zing to any meal.",
        rarity: 4,
    },
    {
        name: "bottle-oil.png",
        displayName: "Bottle of Oil",
        description:
            "A staple in the kitchen—whether you're frying or dressing a salad.",
        rarity: 4,
    },
    {
        name: "bowl-broth.png",
        displayName: "Bowl of Broth",
        description:
            "Warm and soothing—a comforting bowl of broth to lift your spirits.",
        rarity: 5,
    },
    {
        name: "bowl-cereal.png",
        displayName: "Bowl of Cereal",
        description:
            "Perfect for a morning start or a late-night snack. Milk not included!",
        rarity: 5,
    },
    {
        name: "bowl-soup.png",
        displayName: "Bowl of Soup",
        description:
            "A hearty and warming soup, ideal for chilly days or when you need a pick-me-up.",
        rarity: 5,
    },
    {
        name: "bowl.png",
        displayName: "Empty Bowl",
        description: "An empty bowl. So barren, yet so full of potential.",
        rarity: 3,
    },
    {
        name: "bread.png",
        displayName: "Bread",
        description:
            "Freshly baked bread—a simple joy that pairs with almost anything.",
        rarity: 5,
    },
    {
        name: "broccoli.png",
        displayName: "Broccoli",
        description:
            "Green and nutritious—steamed, stir-fried, or raw, it's a healthy choice.",
        rarity: 5,
    },
    {
        name: "burger-cheese-double.png",
        displayName: "Double Cheeseburger",
        description:
            "The ultimate indulgence—two patties, double the cheese, double the joy!",
        rarity: 8,
    },
    {
        name: "burger-cheese.png",
        displayName: "Cheeseburger",
        description:
            "A delicious burger with cheese—a classic and always satisfying.",
        rarity: 6,
    },
    {
        name: "burger-double.png",
        displayName: "Double Hamburger",
        description:
            "Double the patties, double the flavor—a burger that's sure to fill you up.",
        rarity: 6,
    },
    {
        name: "burger.png",
        displayName: "Hamburger",
        description:
            "A Classic. Bun, patty, lettuce, cheese, tomato, bun, in that order.",
        rarity: 5,
    },
    {
        name: "cabbage.png",
        displayName: "Cabbage",
        description:
            "Crunchy and versatile, perfect for salads, soups, or stir-fries.",
        rarity: 5,
    },
    {
        name: "cake-birthday.png",
        displayName: "Birthday Cake",
        description:
            "A festive cake to celebrate any special occasion—sweet and full of joy.",
        rarity: 7,
    },
    {
        name: "cake-slicer.png",
        displayName: "Cake Slicer",
        description:
            "For serving your cake in perfectly sliced portions—an essential party tool.",
        rarity: 3,
    },
    {
        name: "cake.png",
        displayName: "Cake",
        description:
            "Celebrations are incomplete without cake—sweet, moist, and simply irresistible.",
        rarity: 6,
    },
    {
        name: "can-open.png",
        displayName: "Open Can",
        description:
            "An open can with questionable contents. No food, just disappointment.",
        rarity: 1,
    },
    {
        name: "can.png",
        displayName: "Can",
        description:
            "A sealed can of goods. This can will outlive most who would buy it.",
        rarity: 3,
    },
    {
        name: "can-small.png",
        displayName: "Small Can",
        description:
            "A small can—might hold a tiny treat or just be a part of your pantry.",
        rarity: 2,
    },
    {
        name: "candy-bar-wrapper.png",
        displayName: "Wrapped Candybar",
        description:
            "A partially peeled candybar that hints at a sweet treat inside—if only it were still full.",
        rarity: 2,
    },
    {
        name: "candy-bar.png",
        displayName: "Candybar",
        description:
            "Sweet and satisfying—a chocolatey bar that's perfect for a quick sugar fix.",
        rarity: 5,
    },
    {
        name: "carrot.png",
        displayName: "Carrot",
        description:
            "Crunchy, sweet, and great for your eyesight. A veggie with benefits!",
        rarity: 5,
    },
    {
        name: "carton-small.png",
        displayName: "Empty Small Carton",
        description:
            "A small carton—perhaps for milk or juice, but it's empty now.",
        rarity: 2,
    },
    {
        name: "carton.png",
        displayName: "Carton",
        description:
            "A carton ready to be filled with your favorite beverage—milk, juice, or more!",
        rarity: 3,
    },
    {
        name: "cauliflower.png",
        displayName: "Cauliflower",
        description:
            "A versatile veggie—perfect for a healthy diet and great in many dishes.",
        rarity: 5,
    },
    {
        name: "celery-stick.png",
        displayName: "Celery Stick",
        description:
            "Crisp and refreshing—ideal for snacks or adding crunch to salads.",
        rarity: 5,
    },
    {
        name: "cheese-cut.png",
        displayName: "Cheese Slice",
        description:
            "A slice of cheese—great for snacking or topping off your favorite dishes.",
        rarity: 5,
    },
    {
        name: "cheese-slicer.png",
        displayName: "Cheese Slicer",
        description:
            "For cutting your cheese into perfectly even slices—a kitchen must-have.",
        rarity: 3,
    },
    {
        name: "cheese.png",
        displayName: "Cheese Wheel",
        description:
            "Rich and creamy, cheese adds flavor to just about anything. A true delight.",
        rarity: 5,
    },
    {
        name: "cherries.png",
        displayName: "Cherries",
        description:
            "Sweet and juicy—these little gems are perfect for snacking or desserts.",
        rarity: 5,
    },
    {
        name: "chinese.png",
        displayName: "Chinese Takeout",
        description:
            "A variety of tasty dishes from Chinese cuisine—full of flavor and excitement.",
        rarity: 6,
    },
    {
        name: "chocolate-wrapper.png",
        displayName: "Wrapped Chocolate",
        description: "A treat that's been partially devoured. Sweet but empty.",
        rarity: 2,
    },
    {
        name: "chocolate.png",
        displayName: "Chocolate",
        description: "Rich and decadent—a treat that can brighten any day.",
        rarity: 5,
    },
    {
        name: "chopstick.png",
        displayName: "Chopsticks",
        description:
            "Essential for enjoying Asian cuisine—practically an extension of your fingers.",
        rarity: 4,
    },
    {
        name: "chopstic-decorative.png",
        displayName: "Fancy Chopsticks",
        description:
            "The more decorative the utensils, the better the food tastes.",
        rarity: 5,
    },
    {
        name: "cocktail.png",
        displayName: "Cocktail",
        description: "A refreshing drink, perfect for relaxing or celebrating.",
        rarity: 6,
    },
    {
        name: "coconut.png",
        displayName: "Coconut",
        description:
            "Tropical and sweet, perfect for a beachy vibe or adding to your favorite recipes.",
        rarity: 5,
    },
    {
        name: "coconut-half.png",
        displayName: "Half Coconut",
        description:
            "Cracked open to reveal its milk and tender white flesh—half the shell, all the tropics.",
        rarity: 5,
    },
    {
        name: "cookie-chocolate.png",
        displayName: "Chocolate Cookie",
        description: "Chocolate cookies—warm, gooey, and utterly irresistible.",
        rarity: 6,
    },
    {
        name: "cookie.png",
        displayName: "Cookie",
        description:
            "A classic treat—whether plain or with chips, always a crowd-pleaser.",
        rarity: 6,
    },
    {
        name: "cooking-fork.png",
        displayName: "Cooking Fork",
        description:
            "For turning and serving your culinary creations—essential in any kitchen.",
        rarity: 4,
    },
    {
        name: "cooking-knife-chopping.png",
        displayName: "Cleaver",
        description:
            "A sturdy knife for chopping and dicing—your kitchen ally.",
        rarity: 4,
    },
    {
        name: "cooking-knife.png",
        displayName: "Chef's Knife",
        description: "Versatile and sharp—ideal for all your cooking needs.",
        rarity: 4,
    },
    {
        name: "cooking-spatula.png",
        displayName: "Spatula",
        description:
            "Flip, stir, and serve—this spatula is a kitchen essential.",
        rarity: 4,
    },
    {
        name: "cooking-spoon.png",
        displayName: "Cooking Spoon",
        description:
            "For stirring soups and sauces, this spoon is perfect for the job.",
        rarity: 4,
    },
    {
        name: "corn-dog.png",
        displayName: "Corn Dog",
        description:
            "A fairground classic—cornmeal-covered hot dog, crispy and delicious.",
        rarity: 6,
    },
    {
        name: "corn.png",
        displayName: "Corn",
        description:
            "Sweet and crunchy—perfect for summer BBQs or a side dish.",
        rarity: 5,
    },
    {
        name: "croissant.png",
        displayName: "Croissant",
        description: "Flaky and buttery—perfect for breakfast or a snack.",
        rarity: 5,
    },
    {
        name: "cup-coffee.png",
        displayName: "Coffee",
        description:
            "For your morning pick-me-up—hot, rich coffee in a cozy cup.",
        rarity: 5,
    },
    {
        name: "cup-tea.png",
        displayName: "Tea",
        description:
            "A comforting cup of tea—perfect for relaxing or warming up.",
        rarity: 5,
    },
    {
        name: "cupcake.png",
        displayName: "Cupcake",
        description:
            "Sweet, frosted, and adorable—these mini cakes are perfect for any occasion.",
        rarity: 7,
    },
    {
        name: "cutting-board-japanese.png",
        displayName: "Japanese Cutting Board",
        description:
            "A cutting board with a touch of elegance—great for preparing sushi and more.",
        rarity: 4,
    },
    {
        name: "cutting-board.png",
        displayName: "Cutting Board",
        description:
            "A wooden slab used for cutting. It imparts a slight flavor onto the food it touches.",
        rarity: 4,
    },
    {
        name: "cutting-board-round.png",
        displayName: "Round Cutting Board",
        description: "A well rounded cutting board.",
        rarity: 4,
    },
    {
        name: "cup-saucer.png",
        displayName: "Cup Saucer",
        description: "It prevents cup drippage from leaking onto the table.",
        rarity: 2,
    },
    {
        name: "dim-sum.png",
        displayName: "Dim Sum",
        description:
            "A variety of small, savory bites—perfect for sharing or a little indulgence.",
        rarity: 6,
    },
    {
        name: "donut.png",
        displayName: "Donut",
        description: "A classic sweet treat with a bite missing in the center.",
        rarity: 5,
    },
    {
        name: "donut-chocolate.png",
        displayName: "Chocolate Delight",
        description:
            "Chocolate-glazed and irresistible—a sweet treat for any time of day.",
        rarity: 6,
    },
    {
        name: "donut-sprinkles.png",
        displayName: "Sprinkly Spectacle",
        description:
            "Fun and colorful—sprinkled with joy, these donuts are a delight.",
        rarity: 6,
    },
    {
        name: "egg-cooked.png",
        displayName: "Sunny Side Up",
        description:
            "Cooked to perfection—ideal for breakfast or as a meal addition.",
        rarity: 5,
    },
    {
        name: "egg-cup.png",
        displayName: "Egg Cup",
        description:
            "A cup for serving your soft-boiled or poached eggs—elegant and practical.",
        rarity: 4,
    },
    {
        name: "egg-half.png",
        displayName: "Half Egg",
        description:
            "Half an egg—great for a light meal or to complement other dishes.",
        rarity: 4,
    },
    {
        name: "egg.png",
        displayName: "Egg",
        description:
            "A versatile classic. Breakfast, lunch, or dinner—always a hit.",
        rarity: 3,
    },
    {
        name: "eggplant.png",
        displayName: "Eggplant",
        description:
            "Versatile and rich—perfect for grilling, roasting, or adding to your favorite dishes.",
        rarity: 5,
    },
    {
        name: "fish-bones.png",
        displayName: "Fishbones",
        description:
            "All that's left after a delicious fish meal—sharp and a bit sad.",
        rarity: 2,
    },
    {
        name: "fish.png",
        displayName: "Fish",
        description:
            "A delicious fish, high in omega-3 fatty oils and yummy flavor.",
        rarity: 4,
    },
    {
        name: "frappe.png",
        displayName: "Frappe",
        description:
            "A delicious frappe filled with espresso flavor and topped with sweet whipped cream.",
        rarity: 6,
    },
    {
        name: "fries-empty.png",
        displayName: "Fry Container",
        description:
            "The container's empty—hopefully you enjoyed the crispy, golden fries!",
        rarity: 2,
    },
    {
        name: "fries.png",
        displayName: "French Fries",
        description:
            "Crispy, golden fries—perfectly fried and ready to be devoured.",
        rarity: 5,
    },
    {
        name: "frikandel-speciaal.png",
        displayName: "Frikandel",
        description:
            "A Dutch delight—sausage with sauce and onions, a unique treat.",
        rarity: 6,
    },
    {
        name: "frying-pan-lid.png",
        displayName: "Frying Pan Lid",
        description:
            "A lid for your frying pan—essential for keeping the splatters at bay.",
        rarity: 3,
    },
    {
        name: "frying-pan.png",
        displayName: "Frying Pan",
        description: "For cooking up a storm—perfect for frying and sautéing.",
        rarity: 4,
    },
    {
        name: "ginger-bread-cutter.png",
        displayName: "Ginger Bread Cutter",
        description:
            "For shaping your gingerbread into festive forms—a holiday favorite.",
        rarity: 4,
    },
    {
        name: "ginger-bread.png",
        displayName: "Ginger Bread Person",
        description: "Spiced and sweet—ideal for the holidays or a cozy treat.",
        rarity: 6,
    },
    {
        name: "glass-wine.png",
        displayName: "Wine Glass",
        description:
            "Raise a toast with this elegant wine glass—perfect for celebrations.",
        rarity: 6,
    },
    {
        name: "glass.png",
        displayName: "Glass",
        description:
            "A basic drinking glass—simple, versatile, and always useful.",
        rarity: 4,
    },
    {
        name: "grapes.png",
        displayName: "Grapes",
        description:
            "Sweet, juicy grapes—perfect for snacking or adding to a cheese platter.",
        rarity: 5,
    },
    {
        name: "honey.png",
        displayName: "Honey",
        description:
            "Sweet and sticky—nature's candy and a perfect addition to many dishes.",
        rarity: 5,
    },
    {
        name: "hot-dog-raw.png",
        displayName: "Raw Hot Dog",
        description:
            "A raw hot dog—needs some cooking before it's ready to eat.",
        rarity: 2,
    },
    {
        name: "hot-dog.png",
        displayName: "Hot Dog",
        description:
            "Grilled and ready—this hot dog is a classic favorite at ballgames and BBQs.",
        rarity: 5,
    },
    {
        name: "ice-cream-cne.png",
        displayName: "Ice Cream Cone",
        description:
            "An ice cream cone—crunchy and perfect for holding a scoop of your favorite flavor.",
        rarity: 3,
    },
    {
        name: "ice-cream-cup.png",
        displayName: "Ice Cream Cup",
        description:
            "A cup to hold ice cream—easy to eat with a spoon and full of sweet, creamy goodness.",
        rarity: 3,
    },
    {
        name: "ice-cream-scoop-chocolate.png",
        displayName: "Chocolate Ice Cream",
        description: "Chocolate ice cream in a scoop—rich and satisfying.",
        rarity: 6,
    },
    {
        name: "ice-cream-scoop-mint.png",
        displayName: "Mint Cream Cup",
        description:
            "Mint ice cream with a refreshing twist—a perfect summer treat.",
        rarity: 6,
    },
    {
        name: "ice-cream.png",
        displayName: "Ice Cream",
        description:
            "A frozen delight that makes any day a bit sweeter. So many flavors to choose from!",
        rarity: 7,
    },
    {
        name: "knife-block.png",
        displayName: "Knife Block",
        description:
            "A stylish block for storing your kitchen knives—keeps them sharp and handy.",
        rarity: 4,
    },
    {
        name: "leek.png",
        displayName: "Leek",
        description:
            "Mildly sweet and perfect for soups and stews—a great addition to many dishes.",
        rarity: 5,
    },
    {
        name: "lemon-half.png",
        displayName: "Half Lemon",
        description:
            "A zesty half lemon—ideal for adding a touch of citrus to your recipes.",
        rarity: 4,
    },
    {
        name: "lemon.png",
        displayName: "Lemon",
        description:
            "Bright and tangy—lemons are great for flavoring dishes or drinks.",
        rarity: 5,
    },
    {
        name: "loaf-baguette.png",
        displayName: "Baguette",
        description:
            "A crusty baguette—perfect for sandwiches or as a side with meals.",
        rarity: 5,
    },
    {
        name: "loaf-round.png",
        displayName: "Round Loaf",
        description:
            "A round loaf of bread—great for sharing or making sandwiches.",
        rarity: 5,
    },
    {
        name: "loaf.png",
        displayName: "Loaf",
        description:
            "A classic loaf of bread—essential for toast, sandwiches, or just enjoying with butter.",
        rarity: 5,
    },
    {
        name: "lollypop.png",
        displayName: "Lollypop",
        description:
            "A sweet treat on a stick—perfect for a sugary pick-me-up.",
        rarity: 6,
    },
    {
        name: "maki-roe.png",
        displayName: "Roe Maki",
        description:
            "Sushi with roe—fish eggs adding a pop of flavor to your sushi experience.",
        rarity: 6,
    },
    {
        name: "maki-salmon.png",
        displayName: "Salmon Maki",
        description:
            "Salmon sushi rolls—fresh, flavorful, and a staple in Japanese cuisine.",
        rarity: 6,
    },
    {
        name: "maki-vegetable.png",
        displayName: "Veggie Maki",
        description:
            "Vegetable sushi rolls—crisp and light, with a fresh taste.",
        rarity: 6,
    },
    {
        name: "meat-cooked.png",
        displayName: "Cooked Meat",
        description:
            "Cooked meat—tender and ready to be enjoyed in your favorite dishes.",
        rarity: 5,
    },
    {
        name: "meat-patty.png",
        displayName: "Patty",
        description:
            "A juicy meat patty—ideal for burgers or as a standalone treat.",
        rarity: 6,
    },
    {
        name: "meat-raw.png",
        displayName: "Raw Meat",
        description:
            "Raw meat—needs some preparation before it's ready for the table.",
        rarity: 2,
    },
    {
        name: "meat-ribs.png",
        displayName: "Ribs",
        description:
            "Tender, flavorful ribs—perfect for a barbecue or a hearty meal.",
        rarity: 6,
    },
    {
        name: "meat-sausage.png",
        displayName: "Sausage",
        description: "Savory sausages—great for grilling or adding to dishes.",
        rarity: 6,
    },
    {
        name: "meat-tenderizer.png",
        displayName: "Meat Tenderizer",
        description:
            "For tenderizing meat—an essential tool for making your meat dishes just right.",
        rarity: 4,
    },
    {
        name: "mincemeat-pie.png",
        displayName: "Mincemeat Pie",
        description:
            "A classic mincemeat pie—spicy, sweet, and full of festive cheer.",
        rarity: 7,
    },
    {
        name: "mortar-pestle.png",
        displayName: "Pestle",
        description:
            "For grinding spices or making sauces—a versatile kitchen tool.",
        rarity: 4,
    },
    {
        name: "mortar.png",
        displayName: "Mortar",
        description:
            "A part of the mortar and pestle set—great for grinding and mixing ingredients.",
        rarity: 4,
    },
    {
        name: "muffin.png",
        displayName: "Muffin",
        description: "Fluffy, sweet, and always a delightful treat.",
        rarity: 5,
    },
    {
        name: "mug.png",
        displayName: "Mug",
        description: "The perfect vehicle for high-volume fluids.",
        rarity: 5,
    },
    {
        name: "mushroom.png",
        displayName: "Mushroom",
        description: "A classic and flavorful fungi that adds fun to any dish.",
        rarity: 5,
    },
    {
        name: "mushroom-half.png",
        displayName: "Half Mushroom",
        description: "Half of a mushroom, ready to be served.",
        rarity: 4,
    },
    {
        name: "mussel.png",
        displayName: "Closed Mussel",
        description: "Delicious meat, hidden behind a hard shell.",
        rarity: 4,
    },
    {
        name: "mussel-open.png",
        displayName: "Open Mussel",
        description: "The ideal shellfish with just enough meat and flavor.",
        rarity: 5,
    },
    {
        name: "onion.png",
        displayName: "Onion",
        description: "The esteemed champion of flavorful vegetables.",
        rarity: 5,
    },
    {
        name: "onion-half.png",
        displayName: "Half Onion",
        description: "Just the thought of cutting it brings a tear to the eye.",
        rarity: 4,
    },
    {
        name: "orange.png",
        displayName: "Orange",
        description: "Citrus, the final frontier of fruit-kind.",
        rarity: 4,
    },
    {
        name: "pan.png",
        displayName: "Pan",
        description: "Just a normal pan, good for cooking a variety of things.",
        rarity: 4,
    },
    {
        name: "pan-stew.png",
        displayName: "Pan Stew",
        description: "The more convenient the dish, the better it tastes.",
        rarity: 5,
    },
    {
        name: "pancakes.png",
        displayName: "Pancakes",
        description:
            "Fluffy and golden—pancakes are perfect for a leisurely breakfast or brunch.",
        rarity: 7,
    },
    {
        name: "paprika-slice.png",
        displayName: "Paprika Slice",
        description:
            "A slice of paprika, adding a bit of spice but not a full meal.",
        rarity: 3,
    },
    {
        name: "paprika.png",
        displayName: "Paprika",
        description:
            "Smoky and flavorful—paprika adds a dash of spice to any dish.",
        rarity: 5,
    },
    {
        name: "peanut-butter.png",
        displayName: "Peanut Butter",
        description:
            "Creamy or chunky—peanut butter is a tasty spread or ingredient.",
        rarity: 5,
    },
    {
        name: "pear-half.png",
        displayName: "Half Pear",
        description:
            "A juicy pear, only halfway there—still delicious and ready for a snack.",
        rarity: 4,
    },
    {
        name: "pear.png",
        displayName: "Pear",
        description:
            "Sweet and succulent—perfect for snacking or adding to salads.",
        rarity: 5,
    },
    {
        name: "pepper-mill.png",
        displayName: "Pepper Mill",
        description:
            "Grind fresh pepper for seasoning—adds a kick to your meals.",
        rarity: 4,
    },
    {
        name: "pepper.png",
        displayName: "Pepper",
        description:
            "A staple spice for adding heat and flavor to your dishes.",
        rarity: 5,
    },
    {
        name: "pie.png",
        displayName: "Pie",
        description:
            "Sweet, savory, or somewhere in between—pie is a versatile and beloved dessert.",
        rarity: 7,
    },
    {
        name: "pineapple.png",
        displayName: "Pineapple",
        description:
            "Tropical and sweet—perfect for fruit salads or as a pizza topping.",
        rarity: 5,
    },
    {
        name: "pizza-box.png",
        displayName: "Pizza Box",
        description:
            "The container for your pizza—filled with cheesy goodness and toppings.",
        rarity: 2,
    },
    {
        name: "pizza-cutter.png",
        displayName: "Pizza Cutter",
        description:
            "Slice your pizza with ease—an essential tool for any pizza lover.",
        rarity: 4,
    },
    {
        name: "pizza.png",
        displayName: "Pizza",
        description:
            "A piece of heaven with endless toppings. The quintessential comfort food.",
        rarity: 6,
    },
    {
        name: "plate-broken.png",
        displayName: "Broken Plate",
        description:
            "A plate that's seen better days. Maybe serve your food on something else?",
        rarity: 1,
    },
    {
        name: "plate-deep.png",
        displayName: "Deep Plate",
        description:
            "A deep plate for holding soups, stews, or anything that needs a bit more space.",
        rarity: 4,
    },
    {
        name: "plate.png",
        displayName: "Plate",
        description:
            "A plate that can hold anything from noodles, to rice, to fish.",
        rarity: 4,
    },
    {
        name: "plate-dinner.png",
        displayName: "Plate of Dinner",
        description:
            "Nothing a like a plate of food ready to eat after a long day.",
        rarity: 6,
    },
    {
        name: "plate-rectangle.png",
        displayName: "Rectangular Plate",
        description:
            "A rectangular plate—ideal for modern dining or presenting dishes with flair.",
        rarity: 4,
    },
    {
        name: "plate-sauerkraut.png",
        displayName: "Sauerkraut",
        description:
            "A plate with sauerkraut—sour and tangy, a great side for many dishes.",
        rarity: 5,
    },
    {
        name: "popsicle.png",
        displayName: "Popsicle",
        description:
            "A cool, fruity treat that is perfect for refreshing yourself during summer.",
        rarity: 5,
    },
    {
        name: "popsicle-chocolate.png",
        displayName: "Choco Pop",
        description:
            "Chocolate-coated popsicle—cool, creamy, and irresistibly sweet.",
        rarity: 6,
    },
    {
        name: "popsicle-stick.png",
        displayName: "Popsicle Stick",
        description:
            "The stick of a popsicle—nothing without its frozen treat, but essential nonetheless.",
        rarity: 2,
    },
    {
        name: "pot-stew.png",
        displayName: "Hearty Stew",
        description:
            "A stew made with the heartiest chunks of potato, carrots, and beef.",
        rarity: 6,
    },
    {
        name: "pot.png",
        displayName: "Pot",
        description:
            "A pot for making hearty stews—perfect for simmering your favorite recipes.",
        rarity: 4,
    },
    {
        name: "pot-lid.png",
        displayName: "Pot Lid",
        description: "The lid of the pot.",
        rarity: 2,
    },
    {
        name: "pot-stew-lid.png",
        displayName: "Stew Pot Lid",
        description:
            "The lid of a stew pot. Covering the stew can make it simmer better.",
        rarity: 3,
    },
    {
        name: "pudding.png",
        displayName: "Pudding",
        description:
            "Smooth, creamy pudding—an indulgent dessert for any sweet tooth.",
        rarity: 7,
    },
    {
        name: "pumpkin.png",
        displayName: "Pumpkin",
        description:
            "Versatile and festive—great for soups, pies, or Halloween decorations.",
        rarity: 5,
    },
    {
        name: "pumpkin-basic.png",
        displayName: "Smooth Pumpkin",
        description: "A nice smooth pumpkin, perfect for carving.",
        rarity: 5,
    },
    {
        name: "radish.png",
        displayName: "Radish",
        description: "Crunchy and spicy—adds a zing to salads and dishes.",
        rarity: 5,
    },
    {
        name: "rice-ball.png",
        displayName: "Rice Ball",
        description:
            "A simple and satisfying rice ball—perfect for a quick snack or lunch.",
        rarity: 5,
    },
    {
        name: "rollingPin.png",
        displayName: "Rolling Pin",
        description:
            "For rolling out dough with ease—essential for baking and pastry-making.",
        rarity: 4,
    },
    {
        name: "salad.png",
        displayName: "Salad",
        description: "Fresh, crisp, and healthy—ideal as a side or main dish.",
        rarity: 5,
    },
    {
        name: "sandwich.png",
        displayName: "Sandwich",
        description:
            "Layered and delicious—a classic choice for any meal of the day.",
        rarity: 5,
    },
    {
        name: "sausage-half.png",
        displayName: "Half Sausage",
        description:
            "Half a sausage—might still be tasty, but a bit incomplete.",
        rarity: 4,
    },
    {
        name: "sausage.png",
        displayName: "Sausage",
        description:
            "Savory and satisfying—ideal for grilling or adding to your favorite recipes.",
        rarity: 6,
    },
    {
        name: "shaker-pepper.png",
        displayName: "Pepper Shaker",
        description:
            "A pepper shaker—perfect for seasoning your meals with a touch of spice.",
        rarity: 3,
    },
    {
        name: "shaker-salt.png",
        displayName: "Salt Shaker",
        description: "Salt shaker—essential for adding flavor to any dish.",
        rarity: 3,
    },
    {
        name: "skewer-vegetables.png",
        displayName: "Vegetable Skewer",
        description:
            "Skewered veggies—grilled to perfection for a tasty, healthy meal.",
        rarity: 5,
    },
    {
        name: "skewer.png",
        displayName: "Skewer",
        description:
            "For grilling and serving—skewers hold your food together with a touch of style.",
        rarity: 4,
    },
    {
        name: "soda-bottle.png",
        displayName: "Bottled Soda",
        description:
            "A bottle of fizzy soda—refreshing and sweet, with bubbles to tickle your taste buds.",
        rarity: 5,
    },
    {
        name: "soda-can.png",
        displayName: "Can of Soda",
        description:
            "Classic soda in a can—easy to enjoy and perfect for a quick refreshment.",
        rarity: 5,
    },
    {
        name: "soda-glass.png",
        displayName: "Glass of Soda",
        description: "A glass for enjoying your soda—refreshing and chilled.",
        rarity: 4,
    },
    {
        name: "soda.png",
        displayName: "Soda",
        description:
            "Your regular soda that pairs well with any burgers and fries.",
        rarity: 3,
    },
    {
        name: "soda-can-crushed.png",
        displayName: "Crushed Soda Can",
        description:
            "What was once a crispy, refreshing drink is now a smashed up piece of trash.",
        rarity: 1,
    },
    {
        name: "soy.png",
        displayName: "Soy Sauce",
        description:
            "A staple in Asian cuisine—adds a savory depth to your dishes.",
        rarity: 5,
    },
    {
        name: "steamer.png",
        displayName: "Bamboo Steamer",
        description:
            "For steaming your veggies or dumplings—cooks food perfectly while preserving nutrients.",
        rarity: 2,
    },
    {
        name: "strawberry.png",
        displayName: "Strawberry",
        description:
            "Sweet and juicy—perfect for desserts, salads, or just snacking.",
        rarity: 5,
    },
    {
        name: "styrofoam.png",
        displayName: "Styrofoam Container",
        description:
            "A styrofoam dinner plate—convenient but not the most glamorous option.",
        rarity: 2,
    },
    {
        name: "styrofoam-dinner.png",
        displayName: "Styrofoam To-Go",
        description:
            "Food taken to-go in styrofoam. Careful when reheating, the styrofoam might deform.",
        rarity: 4,
    },
    {
        name: "sub.png",
        displayName: "Sub Sandwich",
        description:
            "A sub sandwich—loaded with fillings and always a hearty choice.",
        rarity: 5,
    },
    {
        name: "sundae.png",
        displayName: "Ice Cream Sundae",
        description:
            "A decadent sundae—ice cream topped with sauce and toppings. Pure bliss.",
        rarity: 7,
    },
    {
        name: "sushi-egg.png",
        displayName: "Tamago Sushi",
        description:
            "Sushi with a soft, sweet egg topping—delicate and delightful.",
        rarity: 5,
    },
    {
        name: "sushi-salmon.png",
        displayName: "Salmon Sushi",
        description:
            "Salmon sushi—fresh, flavorful, and a must-try for sushi lovers.",
        rarity: 6,
    },
    {
        name: "taco.png",
        displayName: "Taco",
        description:
            "Crunchy or soft, filled with delicious fillings—tacos are always a hit.",
        rarity: 5,
    },
    {
        name: "tajine-lid.png",
        displayName: "Tajine Lid",
        description: "A conical lid, vital to cooking tajine—a delicious Moroccan dish.",
        rarity: 2,
    },
    {
        name: "tajine.png",
        displayName: "Tajine",
        description:
            "A traditional Moroccan dish—slow-cooked and full of rich flavors.",
        rarity: 6,
    },
    {
        name: "tomato.png",
        displayName: "Tomato",
        description:
            "Fresh and juicy—perfect for salads, sauces, and a multitude of dishes.",
        rarity: 5,
    },
    {
        name: "tomato-slice.png",
        displayName: "Tomato Slice",
        description:
            "A slice of tomato, ready to go on any sandwich or burger.",
        rarity: 3,
    },
    {
        name: "turkey.png",
        displayName: "Turkey",
        description:
            "Roasted turkey—juicy and flavorful, a centerpiece for festive meals.",
        rarity: 8,
    },
    {
        name: "utensil-fork.png",
        displayName: "Fork",
        description: "A fork—essential for enjoying your meals with ease.",
        rarity: 2,
    },
    {
        name: "utensil-knife.png",
        displayName: "Knife",
        description: "A knife—perfect for cutting and preparing your food.",
        rarity: 2,
    },
    {
        name: "utensil-spoon.png",
        displayName: "Spoon",
        description: "A spoon—ideal for soups, desserts, and stirring.",
        rarity: 2,
    },
    {
        name: "waffle.png",
        displayName: "Waffle",
        description:
            "Crispy and golden—waffles are a breakfast favorite that can be sweet or savory.",
        rarity: 3,
    },
    {
        name: "whole-ham.png",
        displayName: "Whole Ham",
        description:
            "A hearty feast all on its own. Juicy, savory, and a crowd-pleaser.",
        rarity: 7,
    },
    {
        name: "wholer-ham.png",
        displayName: "Wholest Ham",
        description: "The entire ham leg, enough to feed a family by itself.",
        rarity: 8,
    },
    {
        name: "wine-red.png",
        displayName: "Red Wine",
        description:
            "Brilliant red wine. Stains the tablecloth as well as your bad memories.",
        rarity: 7,
    },
    {
        name: "wine-white.png",
        displayName: "White Wine",
        description: "A clear wine for the more sophisticated drunk.",
        rarity: 7,
    },
    {
        name: "watermelon.png",
        displayName: "Watermelon",
        description: "A delicious, juicy melon filled with water.",
        rarity: 7,
    },
    {
        name: "whipped-cream.png",
        displayName: "Whipped Cream",
        description:
            "Thick cream aerated into a decadent and light topping for any dessert.",
        rarity: 7,
    },
    {
        name: "whisk.png",
        displayName: "Whisk",
        description: "A tool used for aerating and mixing ingredients.",
        rarity: 2,
    },
];
