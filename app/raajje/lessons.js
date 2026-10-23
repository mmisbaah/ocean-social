/* Social Studies lessons, Grades 1–6. Cards: [heading, text, word box?]. Quiz: [question, right, wrong, wrong, explanation?] or a typed {t:"map"|"order"|"sort"} question. */
/* Each lesson: cards are [heading, text, optional word box]; quiz items are [question, right answer, wrong, wrong, optional explanation]. */
const RAW_LESSONS = [
/* ===== Grade 1 · Me, my home and my school ===== */
{id:"g1-me", grade:1, strand:"culture", pic:"🧒", title:"All about me", blurb:"My name, my birthday and the things that make me special.",
 cards:[
  ["My name","Everyone has a name. Your family chose your name for you. Many Maldivian names have a special meaning. Ask your family what your name means!"],
  ["How old am I?","Every year on your birthday you grow one year older. You also grow taller and learn new things."],
  ["What I like","Some children like football. Some like drawing, swimming or reading. What do you like to do?"],
  ["Same and different","We are all different. We have different faces, voices and favourite things. We are also the same in many ways: we all need food, love and friends.","Special means there is nobody else exactly like you."],
  ["I belong","I belong to my family, my class and my island. Belonging means being part of a group."]
 ],
 quiz:[
  ["Who chose your name?","My family","My teacher","The shopkeeper"],
  ["What happens on your birthday?","I become one year older","I become one year younger","Nothing changes"],
  ["Are all children the same?","No, we are all different","Yes, exactly the same","Only on Fridays"],
  ["What do ALL children need?","Food, love and friends","A bicycle","A phone"],
  ["Which is a group you belong to?","My class","A shark’s family","A different country’s army"]
 ]},
{id:"g1-places", grade:1, strand:"place", pic:"🏠", title:"My home and my school", blurb:"The rooms at home, the places at school and how to find our way.",
 cards:[
  ["My home","A home keeps us safe. Most homes have a kitchen for cooking, a bathroom for washing and rooms for sleeping."],
  ["My school","At school we have a classroom, a library, toilets and a playground. Some schools have a hall where we meet together."],
  ["Near and far","My bed is near me at night. The next island is far away. We need a boat to go far across the sea."],
  ["Left and right","When we walk, we turn left or right. Hold up the hand you write with. Is it your left or your right?"],
  ["The way to school","Think about your way to school. What do you pass on the way? A shop? A mosque? A big tree?","A route is the way we go from one place to another."]
 ],
 quiz:[
  ["Where do we cook food at home?","In the kitchen","In the bathroom","On the roof"],
  ["Where can we borrow books at school?","The library","The playground","The canteen"],
  ["How do we go to a far-away island?","By boat","By walking","By bicycle"],
  ["Which room do we wash in?","The bathroom","The kitchen","The library"],
  ["What is a route?","The way from one place to another","A kind of fish","A school subject"]
 ]},
{id:"g1-needs", grade:1, strand:"econ", pic:"🍚", title:"Things we need", blurb:"Food, water, clothes and a home.",
 cards:[
  ["Needs","Needs are things we must have to live and grow. We need food, clean water, clothes and a home."],
  ["Wants","Wants are things that are nice to have. Toys, sweets and games are wants. We can live without them."],
  ["Where food comes from","Fish comes from the sea. Rice comes on ships from other countries. Coconuts and bananas grow on our islands."],
  ["Families work","Grown-ups in our family work to buy the things we need. Children help too, by tidying up and helping at home."],
  ["Do not waste","Turn off the tap when you are not using water. Eat the food on your plate. Water and food are precious."]
 ],
 quiz:[
  ["Which one is a NEED?","Clean water","A toy car","Sweets","We cannot live without clean water."],
  ["Which one is a WANT?","A video game","Food","Clothes"],
  ["Where does fish come from?","The sea","A tree","A factory"],
  ["Rice comes to the Maldives on…","Ships","Coconut trees","Clouds"],
  ["How can you save water?","Turn off the tap","Leave the tap running","Pour water on the floor"]
 ]},
{id:"g1-day", grade:1, strand:"time", pic:"🌅", title:"My day and my week", blurb:"Morning, afternoon, night and the days of the week.",
 cards:[
  ["Parts of the day","A day has morning, afternoon, evening and night. The sun rises in the morning and sets in the evening."],
  ["Prayer times","In the Maldives, the five daily prayers help mark the day. Fajr is early in the morning, before sunrise. Isha is at night."],
  ["My routine","Every day I wake up, wash, eat breakfast and go to school. A routine is the things we do in the same order every day."],
  ["Seven days","A week has seven days: Sunday, Monday, Tuesday, Wednesday, Thursday, Friday and Saturday."],
  ["The weekend","In the Maldives, the weekend is Friday and Saturday. On Friday many people go to the mosque for Friday prayer.","Yesterday was the day before today. Tomorrow is the day after today."]
 ],
 quiz:[
  ["When does the sun rise?","In the morning","At night","In the afternoon"],
  ["Which prayer is early in the morning?","Fajr","Isha","Asr"],
  ["How many days are in a week?","Seven","Five","Ten"],
  ["Which days are the weekend in the Maldives?","Friday and Saturday","Monday and Tuesday","Sunday and Monday"],
  ["What is the day after today?","Tomorrow","Yesterday","Last year"]
 ]},
{id:"g1-kind", grade:1, strand:"citizen", pic:"🤝", title:"Being kind at school", blurb:"Class rules, sharing and good manners.",
 cards:[
  ["Class rules","Our class has rules. We listen when others speak, we put up our hand to talk and we keep our classroom tidy."],
  ["Sharing","When we share crayons, books and toys, everyone can join in. Sharing makes friends happy."],
  ["Kind words","We say “please” and “thank you”. In Dhivehi, thank you is “shukuriyyaa”."],
  ["Helping","If a friend falls down, we help them up and tell the teacher. Helping others is what good citizens do."],
  ["Saying sorry","Everyone makes mistakes. When we hurt someone, we say sorry and try to do better.","A citizen is a member of a community or country."]
 ],
 quiz:[
  ["What do we do before talking in class?","Put up our hand","Shout loudly","Stand on the desk"],
  ["How do you say thank you in Dhivehi?","Shukuriyyaa","Assalaamu alaikum","Salaam"],
  ["A friend falls down. What should you do?","Help them and tell the teacher","Laugh","Walk away"],
  ["Why do we share?","So everyone can join in","So we have nothing","To make friends sad"],
  ["You bumped into someone by mistake. What do you say?","Sorry","Go away","Nothing"]
 ]},
{id:"g1-senses", grade:1, strand:"inquiry", pic:"👀", title:"Look, listen and ask", blurb:"Using our senses and question words to find things out.",
 cards:[
  ["Five senses","We find out about the world with our five senses: seeing, hearing, smelling, tasting and touching."],
  ["Look closely","At the beach, look closely. What colours can you see? Can you see shells, crabs or footprints in the sand?"],
  ["Listen carefully","Close your eyes and listen. Can you hear waves, birds, boats or the call to prayer?"],
  ["Ask questions","Explorers ask questions: Who? What? Where? When? Why? How?"],
  ["Tell others","When we find something out, we tell others. We can draw it, say it or show it."]
 ],
 quiz:[
  ["How many senses do we have?","Five","Two","Ten"],
  ["Which sense do we use to hear the waves?","Hearing","Tasting","Smelling"],
  ["Which word asks about a PLACE?","Where","When","Who"],
  ["Which word asks about a PERSON?","Who","Where","How"],
  ["How can you share what you found?","Draw a picture","Keep it secret","Forget it"]
 ]},

/* ===== Grade 2 · My family, community and island ===== */
{id:"g2-family", grade:2, strand:"culture", pic:"👨‍👩‍👧", title:"My family and our language", blurb:"Family members, greetings, Dhivehi and Thaana.",
 cards:[
  ["Families are different","Some families are big and some are small. A family can have parents, brothers, sisters, grandparents, aunts, uncles and cousins."],
  ["A family tree","A family tree shows how people in a family are related. Your grandparents are at the top, then your parents, then you."],
  ["Respecting elders","In Maldivian families we show respect to older people. We listen to them and help them."],
  ["Assalaamu alaikum","We greet each other by saying “Assalaamu alaikum”. It means “peace be upon you”. The reply is “Wa alaikum assalaam”."],
  ["Our language","Maldivians speak Dhivehi. We write Dhivehi in the Thaana script, from right to left.","Thaana — the letters we use to write Dhivehi."]
 ],
 quiz:[
  ["Which language do most Maldivians speak?","Dhivehi","French","Japanese"],
  ["Which way do we write Thaana?","Right to left","Left to right","Top to bottom"],
  ["Your mother’s mother is your…","Grandmother","Sister","Cousin"],
  ["What shows how a family is related?","A family tree","A map","A calendar"],
  ["What is the reply to “Assalaamu alaikum”?","Wa alaikum assalaam","Good night","Thank you"]
 ]},
{id:"g2-island", grade:2, strand:"place", pic:"🏝️", title:"My island home", blurb:"Beaches, lagoons, reefs and the places on our island.",
 cards:[
  ["Islands in the ocean","The Maldives is made of many small islands. All around them is the Indian Ocean."],
  ["Beach and lagoon","Most islands have a white sandy beach. Next to it is the lagoon, where the water is shallow and calm.","Lagoon — shallow water between the beach and the reef."],
  ["The coral reef","Past the lagoon is the coral reef. Corals are tiny living animals. The reef breaks big waves and protects the island."],
  ["Places on the island","An island can have a mosque, a school, a health centre, shops, a football ground and an island council office."],
  ["The harbour","Boats come in and go out at the harbour. People and goods travel between islands by boat."]
 ],
 quiz:[
  ["What protects the island from big waves?","The coral reef","The harbour","The mosque","The reef breaks the waves before they reach the beach."],
  ["What is the shallow water between the beach and the reef?","Lagoon","River","Lake"],
  ["Which ocean is around the Maldives?","Indian Ocean","Atlantic Ocean","Arctic Ocean"],
  ["Where would you go if you felt sick?","The health centre","The harbour","The football ground"],
  ["Are corals alive?","Yes, they are tiny animals","No, they are rocks","They are plants"]
 ]},
{id:"g2-jobs", grade:2, strand:"econ", pic:"🧑‍🔧", title:"People who help us", blurb:"Jobs on our island and how people earn money.",
 cards:[
  ["Fishermen","Fishermen go out to sea early in the morning to catch tuna and other fish."],
  ["Farmers","Farmers grow fruits and vegetables like bananas, papayas, chillies and pumpkins on some islands."],
  ["Teachers and doctors","Teachers help us learn. Doctors and nurses look after us when we are sick."],
  ["Shopkeepers","Shopkeepers sell food and things we use every day. We pay them with money."],
  ["Earning money","People get paid for their work. This money is used to buy things the family needs.","Money in the Maldives is called the rufiyaa."]
 ],
 quiz:[
  ["Who catches tuna?","A fisherman","A teacher","A nurse"],
  ["Who grows vegetables?","A farmer","A pilot","A shopkeeper"],
  ["Who looks after us when we are sick?","A doctor","A fisherman","A builder"],
  ["What is the money of the Maldives called?","Rufiyaa","Dollar","Pound"],
  ["Why do people work?","To earn money for what they need","To get bored","Because they must stay at home"]
 ]},
{id:"g2-then", grade:2, strand:"time", pic:"⛵", title:"Then and now", blurb:"How life has changed since our grandparents were young.",
 cards:[
  ["Boats then and now","Long ago, dhonis moved with sails and the wind. Today most dhonis have engines and go much faster.","Dhoni — a traditional Maldivian boat."],
  ["Homes then and now","Long ago many homes had roofs made of coconut palm leaves. Today many roofs are made of metal sheets or concrete."],
  ["Light then and now","Before electricity reached the islands, people used oil lamps at night. Today most homes have electric lights."],
  ["Games then and now","Children long ago played outside on sandy streets with shells, sticks and balls. Today many children also play on phones and tablets."],
  ["Ask a grandparent","Grandparents remember how things used to be. Ask them what school was like when they were young!"]
 ],
 quiz:[
  ["What moved dhonis long ago?","Sails and the wind","Engines","Electricity"],
  ["What did people use for light before electricity?","Oil lamps","Phones","Televisions"],
  ["What were many old roofs made from?","Coconut palm leaves","Glass","Plastic"],
  ["Who can tell us how life was long ago?","Our grandparents","A new baby","A fish"],
  ["Which is from NOW, not long ago?","A tablet computer","An oil lamp","A sail dhoni"]
 ]},
{id:"g2-rules", grade:2, strand:"citizen", pic:"🦺", title:"Rules keep us safe", blurb:"Rules at home, at school and at sea.",
 cards:[
  ["Why rules?","Rules help us stay safe and be fair. We have rules at home, at school and on our island."],
  ["Safe at sea","Always swim with an adult. Wear a life jacket on a boat. Stay away from strong currents near the reef edge."],
  ["Safe on the road","Look both ways before you cross. Wear a helmet when riding a motorbike with your family."],
  ["A clean island","Put rubbish in the bin. Plastic on the beach can hurt turtles, fish and birds."],
  ["Taking turns","When we wait our turn, everyone gets a fair chance to play and to speak."]
 ],
 quiz:[
  ["What should you wear on a boat?","A life jacket","A raincoat","Sunglasses only"],
  ["Who should you swim with?","An adult","Nobody","A crab"],
  ["Where should rubbish go?","In the bin","On the beach","In the sea","Plastic in the sea can hurt sea animals."],
  ["What do you do before crossing a road?","Look both ways","Run fast","Close your eyes"],
  ["Why do we have rules?","To keep us safe and be fair","To make us sad","So nobody can play"]
 ]},
{id:"g2-questions", grade:2, strand:"inquiry", pic:"🔎", title:"Asking good questions", blurb:"How explorers find things out from pictures and people.",
 cards:[
  ["Question words","Who? What? Where? When? Why? How? These words help us find out about the world."],
  ["Look at a picture","What can you see? What are the people doing? Where do you think it is? Is it long ago or now?"],
  ["Ask people","We can ask people who know: parents, teachers, grandparents and neighbours."],
  ["Write it down","When someone answers your question, draw or write the answer so you remember it."],
  ["Share what you found","Tell the class, make a poster or draw a picture to show what you found out."]
 ],
 quiz:[
  ["Which word asks about a TIME?","When","Where","What"],
  ["Who could tell you about your island long ago?","An older neighbour","A baby","A cat"],
  ["Why should you write down answers?","So I remember them","So I lose them","It is not needed"],
  ["Which word asks for a REASON?","Why","Who","Where"],
  ["How can you share what you found?","Make a poster","Keep it a secret","Throw it away"]
 ]},

/* ===== Grade 3 · Our country, our sea ===== */
{id:"g3-celebrate", grade:3, strand:"culture", pic:"🌙", title:"Celebrations in the Maldives", blurb:"Ramadan, the two Eids and our national days.",
 cards:[
  ["Ramadan","During the month of Ramadan, Muslims fast from dawn until sunset. In the evening families break the fast together."],
  ["Eid al-Fitr","Eid al-Fitr comes at the end of Ramadan. People pray Eid prayer, wear new clothes, visit family and share food."],
  ["Eid al-Adha","Eid al-Adha comes during the time of Hajj. It is a time for prayer, sharing and remembering people in need."],
  ["National days","On Independence Day, 26 July, we remember when the Maldives became fully independent. There are parades, flags and celebrations."],
  ["Celebrating together","Celebrations bring families and communities together. Islands hold games, boduberu music and special meals.","A tradition is something people have done in the same way for a long time."]
 ],
 quiz:[
  ["During Ramadan, Muslims fast from…","Dawn until sunset","Sunset until dawn","Lunch to dinner"],
  ["Which Eid comes at the end of Ramadan?","Eid al-Fitr","Eid al-Adha","National Day"],
  ["When is Independence Day?","26 July","1 January","11 November"],
  ["Eid al-Adha comes during the time of…","Hajj","The monsoon","School exams"],
  ["What is a tradition?","Something done the same way for a long time","A new phone","A type of boat"]
 ]},
{id:"g3-sea", grade:3, strand:"place", pic:"🐢", title:"The sea around us", blurb:"Reefs, sea animals and how to protect them.",
 cards:[
  ["A living reef","Coral reefs are home to thousands of kinds of fish, plus turtles, rays, octopus and sea stars."],
  ["Turtles","Sea turtles lay their eggs on sandy beaches at night. Turtles are protected in the Maldives, so it is against the law to harm them."],
  ["Sharks","The Maldives banned shark fishing in 2010. Healthy reefs need sharks, and many visitors come to see them."],
  ["Mangroves","Some islands have mangroves: trees that grow in salty water. Their roots protect the coast and give baby fish a safe home."],
  ["Protecting the sea","We can help by not throwing plastic, not standing on corals and not buying things made from turtle shell.","Habitat — the natural home of an animal or plant."]
 ],
 quiz:[
  ["Where do sea turtles lay their eggs?","On sandy beaches","In trees","In the deep sea"],
  ["In which year did the Maldives ban shark fishing?","2010","1910","1990"],
  ["What are mangroves?","Trees that grow in salty water","A kind of fish","A type of boat"],
  ["How can you protect corals?","Don’t stand on them","Break off a piece","Throw plastic on them"],
  ["What is a habitat?","An animal’s natural home","A fishing net","A school club"]
 ]},
{id:"g3-market", grade:3, strand:"econ", pic:"🛒", title:"From the sea to the market", blurb:"Buying, selling and saving.",
 cards:[
  ["Catching the fish","Fishermen catch tuna in the open sea and bring it back to the harbour in their dhoni."],
  ["The fish market","Fish is sold at the market. In Malé, the fish market by the harbour is busy every afternoon when the boats come in."],
  ["Buying and selling","The seller gives the fish. The buyer gives money. This is called trade."],
  ["Rufiyaa and laari","Our money is the rufiyaa. One rufiyaa is made of 100 laari. We have coins and notes."],
  ["Saving","When we don’t spend all our money, we save it. Saving in a money box helps us buy something bigger later.","Price — how much money something costs."]
 ],
 quiz:[
  ["Where do fishing boats bring the fish?","The harbour","The airport","The school"],
  ["How many laari make one rufiyaa?","100","10","1,000"],
  ["What do we call buying and selling?","Trade","Sleeping","Swimming"],
  ["Why do people save money?","To buy something bigger later","To lose it","To throw it away"],
  ["What is a price?","How much something costs","A kind of fish","A day of the week"]
 ]},
{id:"g3-longago", grade:3, strand:"time", pic:"🕌", title:"Long ago in the Maldives", blurb:"Coral stone mosques, cowrie shells and sailing ships.",
 cards:[
  ["Coral stone mosques","Long ago, builders carved blocks of coral stone to build mosques. The Hukuru Miskiy (Old Friday Mosque) in Malé was built in 1658."],
  ["Cowrie shells","Long ago, Maldivian cowrie shells were used as money in many lands around the Indian Ocean."],
  ["Sailing to trade","Maldivian sailors sailed to Sri Lanka, India and beyond. They traded dried fish, coir rope and cowries for rice and cloth."],
  ["Coir rope","Coir rope is made from coconut husk. It is strong and does not rot in salt water, so it was used on boats."],
  ["Clues from the past","Old buildings, objects and stories are clues that help us learn how people lived long ago."]
 ],
 quiz:[
  ["What were old mosques built from?","Coral stone","Glass","Plastic"],
  ["What was used as money around the Indian Ocean long ago?","Cowrie shells","Coconut leaves","Paper cups"],
  ["Coir rope is made from…","Coconut husk","Fish bones","Sand"],
  ["When was the Hukuru Miskiy built?","1658","2018","1958"],
  ["What did Maldivian traders get in return for dried fish?","Rice and cloth","Cars","Computers"]
 ]},
{id:"g3-symbols", grade:3, strand:"citizen", pic:"🇲🇻", title:"Our national symbols", blurb:"The flag, the anthem and other symbols of the Maldives.",
 cards:[
  ["The national flag","Our flag is red, with a green rectangle in the middle and a white crescent moon inside it."],
  ["What the colours mean","The red stands for the courage of our national heroes. The green stands for peace and progress. The crescent stands for Islam."],
  ["The national anthem","Our national anthem is “Gaumee Salaam”. We stand still and show respect when it is played."],
  ["Other symbols","The national flower is the pink rose. The national tree is the coconut palm. The national bird is the white-breasted waterhen."],
  ["Showing respect","We respect our flag and anthem because they stand for our country and all its people.","A symbol is a picture or object that stands for something else."]
 ],
 quiz:[
  ["What is in the middle of the Maldives flag?","A green rectangle with a white crescent","A blue star","A yellow sun"],
  ["What does the crescent stand for?","Islam","The ocean","The sun"],
  ["What is our national tree?","The coconut palm","The mango tree","The pine tree"],
  ["What is our national anthem called?","Gaumee Salaam","Boduberu","Eid Mubarak"],
  ["What should you do when the anthem plays?","Stand still and show respect","Run around","Talk loudly"]
 ]},
{id:"g3-maps", grade:3, strand:"inquiry", pic:"🗺️", title:"Making a simple map", blurb:"Bird’s-eye view, symbols, keys and directions.",
 cards:[
  ["A bird’s-eye view","A map shows a place as if you are a bird looking down from the sky."],
  ["Symbols","Maps use small pictures called symbols. A tree symbol might show a park. A boat symbol might show the harbour."],
  ["The key","A map key (or legend) tells you what each symbol means."],
  ["Directions","A compass shows North, East, South and West. On most maps, North points to the top."],
  ["Map your island","Draw your island from above. Add the school, the mosque, the harbour and your home. Then make a key!"]
 ],
 quiz:[
  ["A map shows a place from…","Above, like a bird","Underground","Inside a box"],
  ["What tells you what the symbols mean?","The key","The title","The page number"],
  ["Which direction is usually at the top of a map?","North","South","West"],
  ["What are the four main directions?","North, East, South, West","Up, down, left, right","Morning, noon, evening, night"],
  ["A small picture on a map is called a…","Symbol","Sentence","Song"]
 ]},

/* ===== Grade 4 · Our atolls and our way of life ===== */
{id:"g4-traditions", grade:4, strand:"culture", pic:"🥁", title:"Maldivian traditions", blurb:"Music, food and crafts that make us Maldivian.",
 cards:[
  ["Boduberu","Boduberu means “big drum”. Drummers and singers perform together, and the beat gets faster and faster. People dance to it at celebrations."],
  ["Garudhiya","Garudhiya is a clear tuna broth eaten with rice, lime, chilli and onion. It is one of the best-known Maldivian dishes."],
  ["Lacquer work","Laajehun is the craft of making lacquered wooden boxes and vases, carved and coloured by hand. Thulhaadhoo in Baa Atoll is famous for it."],
  ["Mat weaving","On some islands, women weave fine mats called “kunaa” from dried reeds. Patterns and skills are passed down from mother to daughter."],
  ["Keeping traditions alive","When we learn traditional music, food and crafts, we keep our culture alive for the future.","Culture — the way of life of a group of people: their language, food, beliefs, art and customs."]
 ],
 quiz:[
  ["What does “Boduberu” mean?","Big drum","Small boat","Fish soup"],
  ["What is garudhiya?","A tuna broth","A drum","A boat"],
  ["Which island is famous for lacquer work?","Thulhaadhoo","Malé","Hulhumalé","Thulhaadhoo is in Baa Atoll."],
  ["What is “kunaa”?","A woven mat","A fishing hook","A song"],
  ["Which of these is part of a people’s culture?","Their language, food and customs","The weather","The size of the ocean"]
 ]},
{id:"g4-atolls", grade:4, strand:"place", pic:"🧭", title:"Atolls on the map", blurb:"Reading a map of the Maldives and why sea level matters.",
 cards:[
  ["A chain of atolls","The Maldives has about 1,190 coral islands, grouped into 26 natural atolls that stretch from north to south.","Atoll — a ring of coral reef with islands, around a lagoon. The English word comes from Dhivehi “atholhu”."],
  ["Inhabited islands","Only about 190 islands have people living on them. Many others are resorts, farms or uninhabited."],
  ["Our capital","Malé is the capital city. It is very crowded, so Hulhumalé was built by pumping sand onto a reef to make new land."],
  ["Crossing the Equator","The Equator passes through the south of the Maldives, between Huvadhoo Atoll and Fuvahmulah. Addu City is south of the Equator."],
  ["A low country","Most land in the Maldives is less than 1 metre above the sea. That is why rising sea levels matter so much to us."]
 ],
 quiz:[
  ["What is the capital of the Maldives?","Malé","Addu City","Fuvahmulah"],
  ["About how many natural atolls does the Maldives have?","26","6","260"],
  ["Which imaginary line passes through the south of the Maldives?","The Equator","The Tropic of Cancer","The Arctic Circle"],
  ["How was Hulhumalé made?","By pumping sand onto a reef","By a volcano","It has always been there"],
  ["The word “atoll” comes from which language?","Dhivehi","English","Arabic"]
 ]},
{id:"g4-goods", grade:4, strand:"econ", pic:"📦", title:"Goods and services", blurb:"Producers, consumers, imports and exports.",
 cards:[
  ["Goods","Goods are things we can touch and use, like fish, rice, clothes and books."],
  ["Services","Services are things people do for us, like teaching, fixing a boat engine or cutting hair."],
  ["Producers and consumers","A producer makes goods or gives services. A consumer buys and uses them. You are a consumer when you buy a snack!"],
  ["Imports","The Maldives imports (brings in) most of its food, fuel and building materials from other countries by ship and plane."],
  ["Exports","The Maldives exports (sends out) fish, especially tuna, to other countries.","Import — to bring goods in. Export — to send goods out."]
 ],
 quiz:[
  ["Which one is a GOOD?","A bag of rice","A haircut","A lesson"],
  ["Which one is a SERVICE?","A doctor checking you","A pencil","A coconut"],
  ["A person who buys and uses goods is a…","Consumer","Producer","Captain"],
  ["What does the Maldives mostly export?","Fish","Cars","Rice"],
  ["Bringing goods INTO a country is called…","Importing","Exporting","Fishing"]
 ]},
{id:"g4-timelines", grade:4, strand:"time", pic:"📅", title:"Timelines", blurb:"Putting events in order: years, decades and centuries.",
 cards:[
  ["What is a timeline?","A timeline is a line that shows events in the order they happened, from earliest to latest."],
  ["Decades and centuries","A decade is 10 years. A century is 100 years. The year 1965 is in the 20th century."],
  ["Two calendars","In the Maldives we use the Gregorian calendar (January to December) and the Islamic Hijri calendar, which follows the moon."],
  ["My life timeline","You can make a timeline of your own life: the year you were born, your first day at school, when you learned to swim…"],
  ["Our country’s timeline","Our national story has many big events: embracing Islam in 1153, freedom from the Portuguese in 1573 and independence in 1965."]
 ],
 quiz:[
  ["How many years are in a decade?","10","100","1,000"],
  ["How many years are in a century?","100","10","50"],
  ["A timeline shows events in…","The order they happened","Alphabetical order","Random order"],
  ["Which calendar follows the moon?","The Hijri calendar","The Gregorian calendar","A school timetable"],
  ["Which came FIRST?","Embracing Islam (1153)","Independence (1965)","Freedom from the Portuguese (1573)"]
 ]},
{id:"g4-rights", grade:4, strand:"citizen", pic:"⚖️", title:"Rights and responsibilities", blurb:"What every child is entitled to, and what we should do.",
 cards:[
  ["What are rights?","Rights are things every person should have, such as being safe, being treated fairly and getting an education."],
  ["Children’s rights","The Maldives agreed to the United Nations Convention on the Rights of the Child in 1991. It lists the rights of every child."],
  ["Some rights","Every child has the right to go to school, to be healthy, to play, to be safe from harm and to be listened to."],
  ["Responsibilities","Responsibilities are things we should do. With the right to education comes the responsibility to go to school and try our best."],
  ["Getting help","If a child is being hurt, they should tell a trusted adult like a parent or teacher."]
 ],
 quiz:[
  ["Which is a right of every child?","To go to school","To drive a car","To stay up all night"],
  ["Which is a responsibility?","Doing my homework","Getting presents","Watching TV all day"],
  ["What lists the rights of every child?","The UN Convention on the Rights of the Child","A cookbook","A bus timetable"],
  ["In what year did the Maldives agree to it?","1991","1891","2021"],
  ["If a child is being hurt, they should…","Tell a trusted adult","Keep it secret","Do nothing"]
 ]},
{id:"g4-sources", grade:4, strand:"inquiry", pic:"📚", title:"Finding information", blurb:"Books, people, websites and checking what is true.",
 cards:[
  ["Where to look","We can find information in books, newspapers, websites, maps, photos and by asking people."],
  ["Fact or opinion?","A fact can be checked and proven: “Malé is the capital.” An opinion is what someone thinks: “Malé is the best city.”"],
  ["Is it true?","Not everything online is true. Check if the website is from a trusted source, like a government, school or museum."],
  ["Taking notes","When you read, write short notes with key words, not whole sentences. Write where you found the information."],
  ["Interviews","An interview is when you ask someone questions and record their answers. Prepare your questions first."]
 ],
 quiz:[
  ["Which is a FACT?","The Maldives is in the Indian Ocean","Garudhiya is the tastiest food","Football is the best sport"],
  ["Which is an OPINION?","Boduberu is the most exciting music","Malé is the capital","A week has seven days"],
  ["Is everything on the internet true?","No, we should check it","Yes, always","Only on Fridays"],
  ["Good notes use…","Short key words","Every word on the page","Only pictures of fish"],
  ["What should you do before an interview?","Prepare your questions","Forget your questions","Just guess the answers"]
 ]},

/* ===== Grade 5 · Our nation and its story ===== */
{id:"g5-thaana", grade:5, strand:"culture", pic:"✍️", title:"Dhivehi and Thaana", blurb:"The story of our language and how we write it.",
 cards:[
  ["Our language","Dhivehi is the national language of the Maldives. It is related to Sinhala, the language of Sri Lanka, and has borrowed words from Arabic, Hindi, Urdu, Persian and English."],
  ["Older scripts","Before Thaana, Maldivians wrote with older scripts called Dhives Akuru. They were written from left to right."],
  ["Loamaafaanu","Loamaafaanu are old copper plates with royal writing on them. Some from the 12th and 13th centuries are among the oldest records of Maldivian history."],
  ["Thaana","Thaana is written from right to left. The first nine letters came from Arabic numbers. Vowel marks called “fili” are written above or below the letters."],
  ["Protecting our language","Reading, writing and speaking Dhivehi well helps keep our language strong for the future."]
 ],
 quiz:[
  ["Dhivehi is related to which language?","Sinhala","French","Chinese"],
  ["What were the older Maldivian scripts called?","Dhives Akuru","Loamaafaanu","Boduberu"],
  ["What are loamaafaanu?","Old copper plates with writing","A type of drum","A fishing boat"],
  ["What are the vowel marks in Thaana called?","Fili","Atholhu","Dhoni"],
  ["Where did the first nine Thaana letters come from?","Arabic numbers","English letters","Chinese symbols"]
 ]},
{id:"g5-weather", grade:5, strand:"place", pic:"🌦️", title:"Weather, monsoons and the tsunami", blurb:"Our two monsoons and natural hazards.",
 cards:[
  ["A tropical country","The Maldives is close to the Equator, so it is warm all year round, usually between about 25 and 31 °C."],
  ["Iruvai","The northeast monsoon, called Iruvai, usually lasts from about December to April. It is the drier season, with calm seas."],
  ["Hulhangu","The southwest monsoon, called Hulhangu, usually lasts from about May to November. It brings more rain, strong winds and rough seas."],
  ["The 2004 tsunami","On 26 December 2004, a huge tsunami caused by an earthquake near Indonesia hit the Maldives. Many islands were damaged and people lost their homes."],
  ["Being prepared","Weather warnings from the Maldives Meteorological Service help fishermen and travellers stay safe.","Monsoon — a seasonal wind that changes direction and brings different weather."]
 ],
 quiz:[
  ["Why is the Maldives warm all year?","It is close to the Equator","It is near the North Pole","It has many mountains"],
  ["What is the northeast monsoon called?","Iruvai","Hulhangu","Garudhiya"],
  ["Which monsoon brings more rain and rough seas?","Hulhangu","Iruvai","Neither"],
  ["When did the tsunami hit the Maldives?","26 December 2004","26 July 1965","1 January 2000"],
  ["What is a monsoon?","A seasonal wind that brings different weather","A kind of fish","A national holiday"]
 ]},
{id:"g5-tourism", grade:5, strand:"econ", pic:"🎣", title:"Fishing and tourism", blurb:"The two industries that keep our economy going.",
 cards:[
  ["Pole-and-line fishing","Maldivian fishermen catch skipjack tuna one fish at a time with a pole and line. This catches fewer unwanted sea animals and keeps fish stocks healthy."],
  ["Maldive fish","For hundreds of years, tuna was boiled, smoked and dried to make “Maldive fish”. It lasted a long time, so it could be traded far away."],
  ["The first resort","The first tourist resort opened in 1972. Today tourism is the country’s biggest industry."],
  ["Guesthouses","Since around 2009, guesthouses have opened on local islands. This lets island families earn money from tourism too."],
  ["Jobs and care","Tourism creates jobs in resorts, boats, shops and the airport. But we must protect the reefs and beaches that visitors come to see.","Industry — a type of business that makes goods or provides services."]
 ],
 quiz:[
  ["How do Maldivian fishermen traditionally catch tuna?","Pole and line","Nets that drag the seabed","Traps on the beach"],
  ["When did the first tourist resort open?","1972","1872","2012"],
  ["What is the Maldives’ biggest industry today?","Tourism","Car making","Farming wheat"],
  ["Why was “Maldive fish” good for trade?","It lasted a long time","It was very heavy","It had to be eaten fresh"],
  ["How do guesthouses help local islands?","Island families earn money from tourism","They close the harbour","They stop fishing"]
 ]},
{id:"g5-history", grade:5, strand:"time", pic:"📜", title:"Moments in our history", blurb:"Key events we remember on national days.",
 cards:[
  ["1153: Islam","In 1153 the Maldives embraced Islam. This changed the country’s laws, learning and way of life."],
  ["Ibn Battuta","The famous traveller Ibn Battuta lived in the Maldives in the 1340s and worked as a judge. He wrote about the islands in his travel book."],
  ["1573: Bodu Thakurufaanu","Muhammad Thakurufaanu and his brothers led the fight that freed the Maldives from Portuguese rule in 1573. We remember this on National Day."],
  ["1965: Independence","The Maldives became fully independent from British protection on 26 July 1965. That is Independence Day."],
  ["1968: The Republic","The Maldives became a republic on 11 November 1968, which we remember as Republic Day.","Republic — a country led by an elected president, not a king or sultan."]
 ],
 quiz:[
  ["In which year did the Maldives embrace Islam?","1153","1965","1573"],
  ["Who freed the Maldives from Portuguese rule?","Muhammad Thakurufaanu","A British governor","Ibn Battuta"],
  ["Which date is Independence Day?","26 July","11 November","1 January"],
  ["What job did Ibn Battuta do in the Maldives?","Judge","Fisherman","Boat builder"],
  ["What is a republic?","A country led by an elected president","A country with no people","A kind of island"]
 ]},
{id:"g5-government", grade:5, strand:"citizen", pic:"🏛️", title:"How our country is run", blurb:"The Constitution, the President, the Majlis and councils.",
 cards:[
  ["The Constitution","The Constitution is the highest law of the Maldives. The one we use today was adopted in 2008. It sets out how the country is run and the rights of every citizen."],
  ["The President","The President leads the government and is elected by the people every 5 years."],
  ["The People’s Majlis","The People’s Majlis is the parliament. Its members are elected, and they make the laws."],
  ["Councils","Island, atoll and city councils look after local matters, such as harbours, waste and local roads."],
  ["Voting","Citizens aged 18 and over can vote in elections. Voting is how people choose their leaders."]
 ],
 quiz:[
  ["What is the highest law of the Maldives?","The Constitution","A school rule","A council notice"],
  ["Who makes the laws?","The People’s Majlis","The island council","The police"],
  ["How often is the President elected?","Every 5 years","Every year","Every 20 years"],
  ["At what age can citizens vote?","18","10","30"],
  ["Who looks after the island harbour?","The island council","The President","The Majlis"]
 ]},
{id:"g5-graphs", grade:5, strand:"inquiry", pic:"📊", title:"Maps, scales and graphs", blurb:"Reading distances on maps and showing data with graphs.",
 cards:[
  ["Map scale","A scale shows how distance on a map compares to real distance. For example, 1 cm on the map might equal 10 km in real life."],
  ["Latitude and longitude","Lines of latitude run east–west and measure how far north or south a place is. Lines of longitude run north–south. The Maldives lies close to 73° East."],
  ["Collecting data","Data is information we collect, like how many students come to school by bicycle, on foot or by car."],
  ["Bar graphs","A bar graph shows data with bars. The taller the bar, the bigger the number. Every graph needs a title and labels."],
  ["Telling the story","After drawing a graph, explain what it shows: “Most students walk to school.”"]
 ],
 quiz:[
  ["What does a map scale show?","How map distance compares to real distance","The weather","The time"],
  ["Lines that measure how far north or south a place is are…","Latitude","Longitude","Timelines"],
  ["In a bar graph, a taller bar means…","A bigger number","A smaller number","Nothing"],
  ["What does every graph need?","A title and labels","Lots of colours only","Nothing"],
  ["Information we collect is called…","Data","Opinion","Weather"]
 ]},

/* ===== Grade 6 · The Maldives in the world ===== */
{id:"g6-world", grade:6, strand:"culture", pic:"🌍", title:"The Maldives and the world", blurb:"Trade, travellers and international friends.",
 cards:[
  ["Crossroads of the ocean","For centuries, ships sailing between Arabia, Africa, India and East Asia stopped in the Maldives. Traders shared goods, ideas and words."],
  ["Many influences","Our culture mixes South Asian, Arab, African and Southeast Asian influences. You can hear it in our language and music, and taste it in our food."],
  ["United Nations","The Maldives joined the United Nations in September 1965, soon after independence."],
  ["SAARC","In 1985 the Maldives was one of the founding members of SAARC, the South Asian Association for Regional Cooperation."],
  ["A small voice, heard loudly","The Maldives speaks up at world meetings about climate change, because rising seas threaten small island nations.","Influence — the effect one thing has on another."]
 ],
 quiz:[
  ["Why did ships stop in the Maldives long ago?","It was on the trade routes across the Indian Ocean","It had big mountains","It had huge rivers"],
  ["When did the Maldives join the United Nations?","1965","1865","2005"],
  ["The Maldives was a founding member of which group in 1985?","SAARC","The European Union","The Arctic Council"],
  ["What topic does the Maldives often speak about at world meetings?","Climate change","Snow sports","Desert farming"],
  ["What is an influence?","The effect one thing has on another","A type of boat","A tax"]
 ]},
{id:"g6-climate", grade:6, strand:"place", pic:"🌡️", title:"Climate change and our islands", blurb:"Rising seas, coral bleaching and what we can do.",
 cards:[
  ["What is climate change?","Burning coal, oil and gas releases gases that trap heat around the Earth. This makes the planet warmer and changes our weather."],
  ["Rising seas","As the Earth warms, ice melts and sea water expands, so sea levels rise. Low islands like ours are at risk of flooding and erosion."],
  ["Coral bleaching","When the sea gets too warm, corals lose their colour and can die. Major bleaching hit Maldivian reefs in 1998 and again in 2016."],
  ["Protecting Malé","After serious flooding in 1987, a sea wall was built around Malé with help from Japan."],
  ["What we can do","Use less electricity, choose solar power, cut plastic, plant trees and protect reefs and mangroves.","Erosion — when land is slowly worn away by water or wind."]
 ],
 quiz:[
  ["What causes climate change?","Gases from burning coal, oil and gas","The moon","Fishing with a pole"],
  ["Why do sea levels rise?","Ice melts and warm water expands","Fish drink less water","The islands sink by magic"],
  ["What happens in coral bleaching?","Corals lose their colour and can die","Corals turn into sand instantly","Corals grow faster"],
  ["Who helped build the Malé sea wall?","Japan","Brazil","Canada"],
  ["What is erosion?","Land slowly worn away by water or wind","A type of storm cloud","A new island being made"]
 ]},
{id:"g6-money", grade:6, strand:"econ", pic:"🏦", title:"Earning, saving and the economy", blurb:"Budgets, banks, taxes and the Monetary Authority.",
 cards:[
  ["Income and spending","Income is money we receive, from a job or a business. Spending is money we use to buy things."],
  ["Budgets","A budget is a plan for money. It lists income and spending so we know how much we can save."],
  ["Banks","Banks keep money safe, help people save and lend money to people and businesses."],
  ["The Monetary Authority","The Maldives Monetary Authority (MMA), set up in 1981, is our central bank. It issues the rufiyaa and looks after the country’s money system."],
  ["Taxes","People and businesses pay taxes such as GST to the government. Taxes help pay for schools, hospitals, roads and harbours."]
 ],
 quiz:[
  ["What is income?","Money we receive","Money we lose","A kind of shop"],
  ["What is a budget?","A plan for money","A type of boat","A sea animal"],
  ["Which organisation issues the rufiyaa?","The Maldives Monetary Authority","The island council","The fish market"],
  ["What do taxes help pay for?","Schools, hospitals and harbours","Only sweets","Nothing"],
  ["What does a bank do?","Keeps money safe and lends money","Catches fish","Builds dhonis"]
 ]},
{id:"g6-modern", grade:6, strand:"time", pic:"🏙️", title:"Becoming a modern nation", blurb:"Constitutions, the first republic and change in the 20th century.",
 cards:[
  ["1932: The first constitution","In 1932, the Maldives got its first written constitution, which set down rules for how the country was governed."],
  ["1953: The first republic","In 1953 the Maldives briefly became a republic, with Mohamed Amin Didi as its first President. The sultanate soon returned."],
  ["1965 and 1968","The Maldives became independent in 1965 and a republic again in 1968. This second republic continues today."],
  ["2008: A new constitution","A new constitution in 2008 separated the powers of government and allowed many political parties. The first multi-party presidential election was held that year."],
  ["Change and continuity","Some things changed, like how leaders are chosen. Other things continued, like our faith, language and love of the sea.","Continuity — things that stay the same over time."]
 ],
 quiz:[
  ["When did the Maldives get its first written constitution?","1932","1153","2020"],
  ["Who was the first President of the Maldives?","Mohamed Amin Didi","Muhammad Thakurufaanu","Ibn Battuta"],
  ["In what year was the first multi-party presidential election held?","2008","1965","1932"],
  ["Which of these is an example of continuity?","Our language, Dhivehi","How leaders are chosen","The 2008 constitution"],
  ["Put in order: which came LAST?","The 2008 constitution","Independence in 1965","The first constitution in 1932"]
 ]},
{id:"g6-democracy", grade:6, strand:"citizen", pic:"🗳️", title:"Democracy and elections", blurb:"Three branches of government and how elections work.",
 cards:[
  ["What is democracy?","In a democracy, people choose their leaders by voting, and leaders must follow the law."],
  ["Three branches","Power is shared between three branches: the executive (the President and ministers), the legislature (the People’s Majlis) and the judiciary (the courts)."],
  ["The courts","The courts decide if laws have been broken and settle disagreements. The Supreme Court is the highest court in the Maldives."],
  ["Free and fair elections","The Elections Commission runs elections. Voting is secret, so nobody can see who you voted for."],
  ["Active citizens","Being an active citizen means staying informed, voting when you are old enough, respecting others’ views and helping your community.","Separation of powers — sharing power between branches so no one group has all of it."]
 ],
 quiz:[
  ["In a democracy, how are leaders chosen?","By voting","By lucky draw","By the oldest person"],
  ["Which branch makes the laws?","The legislature (People’s Majlis)","The judiciary","The executive"],
  ["What is the highest court in the Maldives?","The Supreme Court","The island council","The People’s Majlis"],
  ["Who runs elections?","The Elections Commission","The fish market","The Monetary Authority"],
  ["Why is voting secret?","So nobody can see who you voted for","So votes get lost","So people can vote twice"]
 ]},
{id:"g6-project", grade:6, strand:"inquiry", pic:"🧪", title:"Doing a research project", blurb:"From a good question to a finished presentation.",
 cards:[
  ["Ask a focused question","A good research question is clear and specific, like “How has fishing on our island changed since 1990?”"],
  ["Plan and collect","Decide where you will get information: interviews, surveys, books, websites, photos or maps."],
  ["Primary and secondary sources","Primary sources come from the time or from people who were there, like an interview or an old photo. Secondary sources are made later, like a textbook."],
  ["Analyse","Look for patterns in your information. Compare sources. Do they agree? Separate facts from opinions."],
  ["Present and credit","Share your findings with a poster, slides or a talk. Always list your sources at the end.","Bibliography — a list of the sources you used."]
 ],
 quiz:[
  ["Which is the best research question?","How has fishing on our island changed since 1990?","Fish?","Is the sea nice?"],
  ["An interview with someone who was there is a…","Primary source","Secondary source","Opinion poll of fish"],
  ["What should you do if two sources disagree?","Compare them and find out why","Pick one at random","Give up"],
  ["What is a bibliography?","A list of the sources you used","A story about your life","A type of map"],
  ["A survey is a way to…","Collect information from many people","Draw a map","Cook a meal"]
 ]}
];
/* Shorter, simpler pages for Grade 1 readers. */
const G1_CARDS = {
 "g1-me":[["My name","Everyone has a name. My family chose my name."],["My birthday","On my birthday I am one year older."],["What I like","I like to play. I like to draw. What do you like?"],["Same and different","We all look different. We all need food, love and friends.","Special: nobody else is just like you."],["I belong","I belong to my family. I belong to my class."]],
 "g1-places":[["My home","My home keeps me safe. We cook in the kitchen. We sleep in the bedroom."],["My school","My school has a classroom, a library and a playground."],["Near and far","My bed is near. The next island is far. We go far by boat."],["Left and right","I have a left hand and a right hand. Which hand do you write with?"],["The way to school","What do you see on the way to school? A shop? A mosque? A tree?","Route: the way from one place to another."]],
 "g1-needs":[["Needs","We need food. We need water. We need clothes and a home."],["Wants","Toys and sweets are wants. They are nice, but we do not need them."],["Where food comes from","Fish comes from the sea. Coconuts grow on trees. Rice comes on ships."],["Families work","Grown-ups work to buy what we need. I help at home too."],["Do not waste","Turn off the tap. Eat the food on your plate."]],
 "g1-day":[["Parts of the day","Morning. Afternoon. Evening. Night."],["Prayer times","Fajr is early in the morning. Isha is at night."],["My routine","I wake up. I wash. I eat. I go to school."],["Seven days","A week has seven days."],["The weekend","Friday and Saturday are the weekend. On Friday we go to the mosque.","Tomorrow is the day after today."]],
 "g1-kind":[["Class rules","We listen. We put up our hand to talk. We keep the class tidy."],["Sharing","We share crayons and books. Sharing is kind."],["Kind words","We say please. We say thank you. In Dhivehi, thank you is “shukuriyyaa”."],["Helping","A friend falls down. I help and I tell the teacher."],["Saying sorry","If I hurt someone, I say sorry."]],
 "g1-senses":[["Five senses","I see. I hear. I smell. I taste. I touch."],["Look closely","Look at the beach. Can you see shells? Can you see a crab?"],["Listen","Close your eyes. Can you hear the waves? Can you hear birds?"],["Ask questions","Who? What? Where? When? Why? How?"],["Tell others","I can draw what I found. I can tell my class."]]
};

/* Map, timeline and sorting questions added to existing lessons. */
const EXTRA_Q = {
 "g1-needs":[{t:"sort", q:"Is it a need or a want?", bins:["Need","Want"], items:[["Water",0],["Sweets",1],["A home",0],["A toy car",1]]}],
 "g1-day":[{t:"order", q:"Put the parts of the day in order.", items:["Morning","Afternoon","Evening","Night"]}],
 "g2-jobs":[{t:"sort", q:"Who works on the sea, and who works on land?", bins:["Sea","Land"], items:[["Fisherman",0],["Teacher",1],["Farmer",1],["Boat captain",0]]}],
 "g2-then":[{t:"sort", q:"Long ago or now?", bins:["Long ago","Now"], items:[["Oil lamp",0],["Tablet computer",1],["Sail dhoni",0],["Speedboat",1]]}],
 "g3-maps":[{t:"map", q:"North is at the top. Tap the place that is furthest NORTH.", place:"Haa Alif"},{t:"map", q:"Tap the place that is furthest SOUTH.", place:"Addu City"}],
 "g3-longago":[{t:"order", q:"Put these in order, oldest first.", items:["Maldives embraces Islam (1153)","Hukuru Miskiy is built (1658)","Independence (1965)"]}],
 "g4-atolls":[{t:"map", q:"Tap Malé, the capital city.", place:"Malé"},{t:"map", q:"Tap the city that is south of the Equator, at the very bottom.", place:"Addu City"}],
 "g4-goods":[{t:"sort", q:"Good or service?", bins:["Good","Service"], items:[["A bag of rice",0],["A haircut",1],["A school bag",0],["Fixing an engine",1]]}],
 "g4-timelines":[{t:"order", q:"Put these events on the timeline, oldest first.", items:["Islam (1153)","Freedom from the Portuguese (1573)","Independence (1965)","Republic Day (1968)"]}],
 "g4-sources":[{t:"sort", q:"Fact or opinion?", bins:["Fact","Opinion"], items:[["Malé is the capital",0],["Garudhiya is the best food",1],["A week has seven days",0],["Football is boring",1]]}],
 "g4-traditions":[{t:"map", q:"Thulhaadhoo is famous for lacquer work. Tap Thulhaadhoo in Baa Atoll.", place:"Thulhaadhoo"}],
 "g5-history":[{t:"order", q:"Put these events in order, oldest first.", items:["Islam (1153)","Ibn Battuta arrives (1340s)","Bodu Thakurufaanu (1573)","Independence (1965)","Republic (1968)"]}],
 "g5-weather":[{t:"sort", q:"Which monsoon is it?", bins:["Iruvai (northeast)","Hulhangu (southwest)"], items:[["Drier, calmer seas",0],["More rain",1],["About December to April",0],["About May to November",1]]}],
 "g5-government":[{t:"sort", q:"National or local?", bins:["National","Local"], items:[["The President",0],["Island council",1],["People’s Majlis",0],["Fixing the island harbour",1]]}],
 "g6-modern":[{t:"order", q:"Put these in order, oldest first.", items:["First constitution (1932)","First republic (1953)","Independence (1965)","Second republic (1968)","New constitution (2008)"]}],
 "g6-democracy":[{t:"sort", q:"Which branch of government?", bins:["Executive","Legislature","Judiciary"], items:[["The President",0],["People’s Majlis",1],["Supreme Court",2],["Ministers",0]]}],
 "g6-project":[{t:"order", q:"Put the steps of a research project in order.", items:["Ask a question","Collect information","Analyse what you found","Present and list sources"]}],
 "g6-climate":[{t:"map", q:"Malé is protected by a sea wall. Tap Malé.", place:"Malé"}]
};

RAW_LESSONS.push(
/* ===== Grade 1 extra ===== */
{id:"g1-feelings", grade:1, strand:"culture", pic:"😊", title:"My feelings", blurb:"Happy, sad, angry and scared.",
 cards:[["Happy","I feel happy when I play with my friends."],["Sad","I feel sad when I lose something. It is OK to cry."],["Angry","When I feel angry, I stop and take a deep breath."],["Scared","When I feel scared, I tell a grown-up I trust."],["Others have feelings too","My friends have feelings too. I can be kind to them.","Feelings: happy, sad, angry, scared."]],
 quiz:[["What can you do when you feel angry?","Take a deep breath","Hit someone","Throw things"],["Who can you tell when you feel scared?","A grown-up I trust","Nobody","A stranger"],["Is it OK to cry when you are sad?","Yes","No","Only at night"],["Do your friends have feelings too?","Yes","No","Only grown-ups do"],
  {t:"sort", q:"Happy or sad?", bins:["Happy","Sad"], items:[["Playing with friends",0],["Losing my toy",1],["Eating my favourite food",0],["My friend is sick",1]]}]},
{id:"g1-weather", grade:1, strand:"place", pic:"☀️", title:"Sun, rain and wind", blurb:"Weather on our island.",
 cards:[["Sunny days","Most days are sunny and hot. We wear a hat and drink water."],["Rainy days","Some days it rains a lot. We use an umbrella."],["Windy days","On windy days the sea has big waves."],["Stormy days","In a storm we stay inside. We do not go in the sea."],["Weather changes","The weather can change in one day. Look at the sky!","Weather: what the sky and air are like today."]],
 quiz:[["What do we wear on a sunny day?","A hat","A coat","Boots"],["What do we use when it rains?","An umbrella","Sunglasses","A ball"],["What should we do in a storm?","Stay inside","Go swimming","Go fishing"],["What makes big waves?","Strong wind","The moon only","Fish"],
  {t:"sort", q:"Sunny or rainy?", bins:["Sunny","Rainy"], items:[["Wear a hat",0],["Use an umbrella",1],["Drink lots of water",0],["Puddles on the road",1]]}]},
{id:"g1-helpers", grade:1, strand:"econ", pic:"🧹", title:"Helpers at school", blurb:"The people who make our school work.",
 cards:[["Teachers","Teachers help us learn to read, write and count."],["The principal","The principal looks after the whole school."],["Cleaners","Cleaners keep our school clean."],["Guards","The security guard keeps the gate safe."],["Saying thank you","All these people work hard. We say thank you to them!"]],
 quiz:[["Who helps us learn to read?","The teacher","The guard","The cleaner"],["Who looks after the whole school?","The principal","A student","A fisherman"],["Who keeps the gate safe?","The security guard","The cook","The baby"],["Who keeps the school clean?","Cleaners","Fish","Birds"],["What can we say to our school helpers?","Thank you","Go away","Nothing"]]},
{id:"g1-growing", grade:1, strand:"time", pic:"👶", title:"When I was a baby", blurb:"How I grow and change.",
 cards:[["A baby","When I was a baby, I could not walk or talk."],["A toddler","Then I learned to walk. I said my first words."],["Now","Now I go to school. I can read, run and swim."],["Photos","Old photos show me when I was little."],["Growing up","One day I will be a grown-up!"]],
 quiz:[["Could you walk when you were a baby?","No","Yes","Only on Fridays"],["What shows you when you were little?","Old photos","A new toy","The weather"],["What can you do now?","Go to school","Nothing","Drive a boat alone"],["What will you be one day?","A grown-up","A baby again","A fish"],
  {t:"order", q:"Put these in order.", items:["Baby","Toddler","School child","Grown-up"]}]},

/* ===== Grade 2 extra ===== */
{id:"g2-food", grade:2, strand:"culture", pic:"🍛", title:"Food in a Maldivian home", blurb:"Mas huni, roshi, curry and short eats.",
 cards:[["Mas huni","Mas huni is a breakfast of tuna, grated coconut, onion and chilli. We eat it with roshi, a flat bread."],["Rice and curry","For lunch many families eat rice with fish curry, called mas riha."],["Hedhikaa","Hedhikaa are small snacks, sweet and savoury, eaten with tea in the afternoon."],["Coconut everywhere","Coconut is in many of our foods. Coconut milk makes curries creamy."],["Eating together","Families often eat together and share food with neighbours."]],
 quiz:[["What is mas huni made with?","Tuna, coconut, onion and chilli","Chocolate","Bread and jam"],["What is roshi?","A flat bread","A drink","A fish"],["What are hedhikaa?","Small snacks eaten with tea","A type of boat","A song"],["What is mas riha?","Fish curry","A dessert","Fruit juice"],["What makes curries creamy?","Coconut milk","Sea water","Sugar"]]},
{id:"g2-coconut", grade:2, strand:"place", pic:"🌴", title:"The coconut palm", blurb:"Our national tree and all its uses.",
 cards:[["Our national tree","The coconut palm is the national tree of the Maldives. It grows on almost every island."],["Food and drink","We drink coconut water. We grate coconut flesh and make coconut milk."],["Roofs and mats","Dried palm leaves, called cadjan, were used for roofs and fences."],["Rope","Coir rope is made from coconut husk. It is strong in salt water."],["Wood for boats","Coconut wood was used to build traditional dhonis."]],
 quiz:[["What is the national tree of the Maldives?","The coconut palm","The mango tree","The pine tree"],["What is made from coconut husk?","Coir rope","Glass","Paper money"],["What is cadjan?","Dried palm leaves","A fish","A drum"],["What was used to build traditional dhonis?","Coconut wood","Plastic","Metal pipes"],
  {t:"sort", q:"Which part of the coconut palm?", bins:["Fruit","Leaves","Husk"], items:[["Coconut water",0],["Roof thatch",1],["Coir rope",2],["Coconut milk",0]]}]},
{id:"g2-shop", grade:2, strand:"econ", pic:"💵", title:"At the shop", blurb:"Prices, paying and getting change.",
 cards:[["The price","Every item in a shop has a price. The price tells us how much it costs."],["Paying","We pay with money: notes and coins."],["Rufiyaa notes","Rufiyaa notes come in 5, 10, 20, 50, 100, 500 and 1,000."],["Change","If you pay 10 rufiyaa for something that costs 7, you get 3 rufiyaa back. This is called change."],["Choosing","We cannot buy everything. We choose what we need most."]],
 quiz:[["What tells us how much something costs?","The price","The colour","The size"],["You pay 10 rufiyaa for a 7 rufiyaa snack. How much change?","3 rufiyaa","7 rufiyaa","17 rufiyaa"],["Which is a rufiyaa note?","50","3","7"],["What do we get back when we pay too much?","Change","Nothing","A receipt only"],["We cannot buy everything, so we…","Choose what we need most","Take things","Buy nothing ever"]]},
{id:"g2-months", grade:2, strand:"time", pic:"🗓️", title:"Months and seasons", blurb:"Twelve months and two monsoons.",
 cards:[["Twelve months","A year has 12 months, from January to December."],["Birthdays","Your birthday comes once every year, in the same month."],["The Islamic months","The Islamic calendar also has 12 months. Ramadan is one of them."],["Two seasons","The Maldives has two main seasons: a drier season and a wetter, windier season."],["A year goes round","After December comes January again, and a new year starts."]],
 quiz:[["How many months are in a year?","12","7","30"],["Which month comes after December?","January","November","March"],["Ramadan is a month in which calendar?","The Islamic calendar","The school timetable","A bus timetable"],["How many main seasons does the Maldives have?","Two","Four","Ten"],
  {t:"order", q:"Put these months in order.", items:["January","February","March","April"]}]},

/* ===== Grade 3 extra ===== */
{id:"g3-community", grade:3, strand:"citizen", pic:"🏘️", title:"Our island community", blurb:"Working together to make island life better.",
 cards:[["What is a community?","A community is a group of people who live in the same place and help each other."],["The island council","The island council is elected by the people. It looks after the harbour, roads and waste."],["Working together","People clean the beach, fix the mosque and organise sports days together."],["Volunteers","A volunteer helps without being paid. Children can volunteer too!"],["Everyone matters","Old and young, everyone has a part to play in the community."]],
 quiz:[["What is a community?","People in one place who help each other","A type of fish","A single house"],["Who elects the island council?","The people of the island","The fish","Tourists"],["What is a volunteer?","Someone who helps without being paid","A shopkeeper","A teacher’s pet"],["Which is working together?","Cleaning the beach as a group","Throwing rubbish","Staying home alone"],["Who has a part to play in the community?","Everyone","Only grown-ups","Only the council"]]},
{id:"g3-waste", grade:3, strand:"place", pic:"♻️", title:"Waste and our islands", blurb:"Reduce, reuse, recycle.",
 cards:[["A big problem","Small islands have little space, so rubbish is a big problem."],["Thilafushi","Since 1992, much of Malé’s rubbish has gone to Thilafushi, an island made from waste."],["Reduce","Reduce means using less. Carry a water bottle instead of buying plastic ones."],["Reuse","Reuse means using things again, like jars, bags and boxes."],["Recycle","Recycle means making old things into new ones. Food scraps can become compost for plants."]],
 quiz:[["Why is rubbish a big problem on small islands?","There is little space","Islands are too big","Fish eat it all"],["Where has much of Malé’s rubbish gone since 1992?","Thilafushi","Fuvahmulah","The moon"],["What does reduce mean?","Use less","Use more","Throw away"],["Which is reusing?","Using a jar again","Throwing a jar in the sea","Breaking a jar"],
  {t:"sort", q:"Recycle or compost?", bins:["Recycle","Compost"], items:[["Plastic bottle",0],["Banana peel",1],["Drink can",0],["Fish bones and vegetable scraps",1]]}]},
{id:"g3-transport", grade:3, strand:"econ", pic:"⛴️", title:"Getting around", blurb:"Boats, ferries, seaplanes and the bridge.",
 cards:[["Dhonis and speedboats","Dhonis and speedboats carry people and goods between islands."],["Ferries","Ferries travel on fixed routes and times, like a bus on the sea."],["Seaplanes","Seaplanes take off and land on the water. They take many tourists to resorts."],["Domestic airports","Many atolls have small airports, so people can fly from Malé to the south or north."],["Sinamalé Bridge","Since 2018, the Sinamalé Bridge has joined Malé to Hulhulé, where the international airport is."]],
 quiz:[["What travels on fixed routes and times, like a bus on the sea?","A ferry","A seaplane","A bicycle"],["Where do seaplanes land?","On the water","On the roof","On the beach sand"],["What does the Sinamalé Bridge join Malé to?","Hulhulé","Addu","Fuvahmulah"],["When did the bridge open?","2018","1918","1968"],
  {t:"map", q:"Tap Malé, where the bridge starts.", place:"Malé"}]},
{id:"g3-heroes", grade:3, strand:"time", pic:"🛡️", title:"Heroes from our past", blurb:"People we remember in our history.",
 cards:[["Abu al-Barakat","According to tradition, a traveller called Abu al-Barakat helped bring Islam to the Maldives in 1153."],["Ali Rasgefaanu","Sultan Ali Rasgefaanu died fighting Portuguese invaders in Malé in 1558. He is remembered for his bravery."],["Muhammad Thakurufaanu","Muhammad Thakurufaanu led the fight that freed the Maldives from Portuguese rule in 1573."],["Remembering heroes","We remember these heroes on special days and in the names of buildings and roads."],["Everyday heroes","Today, nurses, teachers, fishermen and volunteers are heroes in their own way."]],
 quiz:[["Who freed the Maldives from Portuguese rule in 1573?","Muhammad Thakurufaanu","Ali Rasgefaanu","Ibn Battuta"],["Who died fighting the Portuguese in 1558?","Ali Rasgefaanu","Muhammad Thakurufaanu","A British officer"],["According to tradition, who helped bring Islam in 1153?","Abu al-Barakat","A Portuguese captain","A tourist"],["How do we remember heroes?","Special days and names of places","We forget them","We hide their stories"],
  {t:"order", q:"Put these in order, oldest first.", items:["Islam (1153)","Ali Rasgefaanu (1558)","Muhammad Thakurufaanu (1573)"]}]},

/* ===== Grade 4 extra ===== */
{id:"g4-islam", grade:4, strand:"culture", pic:"🕌", title:"Islam in Maldivian life", blurb:"Faith in everyday island life.",
 cards:[["A Muslim nation","The Maldives has been a Muslim country since 1153. Islam shapes our laws, holidays and daily life."],["Mosques","Every inhabited island has at least one mosque. The call to prayer is heard five times a day."],["The Islamic Centre","The Islamic Centre in Malé, with its golden dome, opened in 1984. Its mosque is named after Muhammad Thakurufaanu."],["Giving","Zakat is giving part of your wealth to people in need. It is one of the five pillars of Islam."],["Values","Honesty, kindness, respect and helping others are important Islamic values."]],
 quiz:[["Since when has the Maldives been a Muslim country?","1153","1965","2008"],["How many times a day is the call to prayer heard?","Five","Two","Ten"],["What is zakat?","Giving to people in need","A type of food","A boat race"],["When did the Islamic Centre open?","1984","1784","2014"],["Which is an Islamic value?","Honesty","Greed","Lying"]]},
{id:"g4-atollform", grade:4, strand:"place", pic:"🌋", title:"How an atoll forms", blurb:"From volcano to coral ring.",
 cards:[["It starts with a volcano","Millions of years ago, volcanoes rose from the ocean floor and made islands."],["A fringing reef","Corals grew in the warm, shallow water around the volcanic island."],["The island sinks","Slowly, the volcano sank, but the corals kept growing upwards towards the light."],["A ring of reef","At last the volcano disappeared below the sea, leaving a ring of coral around a lagoon: an atoll."],["Sand islands","Waves broke coral into sand, which piled up on the reef to make our islands.","Charles Darwin first explained this idea in the 1830s."]],
 quiz:[["What do atolls start as?","Volcanic islands","Sand dunes","Mountains of ice"],["What keeps growing upwards as the volcano sinks?","Coral","Trees","Rocks"],["What is in the middle of an atoll ring?","A lagoon","A volcano","A desert"],["What are Maldivian islands made of?","Coral sand","Volcanic rock on top","Ice"],
  {t:"order", q:"Put the stages of atoll formation in order.", items:["A volcanic island","A fringing reef grows","The volcano sinks","A ring of coral around a lagoon"]}]},
{id:"g4-farming", grade:4, strand:"econ", pic:"🍌", title:"Farming on coral islands", blurb:"Growing food where soil and water are scarce.",
 cards:[["Hard to farm","Coral sand is poor soil and fresh water is limited, so farming is difficult."],["What grows","Farmers grow bananas, papayas, chillies, watermelons, breadfruit and taro (ala)."],["Farming islands","Some islands, such as those in Laamu and Haa Dhaalu, are known for their farms."],["New ideas","Some farmers use hydroponics: growing plants in water with nutrients instead of soil."],["Imported food","Because farming is hard, most of our food, such as rice, flour and sugar, is imported."]],
 quiz:[["Why is farming hard on coral islands?","Poor soil and little fresh water","Too much snow","No sunlight"],["Which crop grows in the Maldives?","Papaya","Wheat","Apples"],["What is hydroponics?","Growing plants in water instead of soil","Fishing at night","Building boats"],["Is most food in the Maldives grown locally or imported?","Imported","Grown locally","Neither"],
  {t:"sort", q:"Grown here or mostly imported?", bins:["Grown here","Mostly imported"], items:[["Bananas",0],["Rice",1],["Chillies",0],["Flour",1]]}]},
{id:"g4-water", grade:4, strand:"citizen", pic:"💧", title:"Using water responsibly", blurb:"Where our fresh water comes from and how to save it.",
 cards:[["Rainwater","Many families collect rainwater from their roofs in tanks."],["Groundwater","Under each island is a thin layer of fresh water floating on salt water. If we use too much, it turns salty."],["Desalination","Desalination plants remove salt from sea water. Malé and many islands get drinking water this way."],["It costs energy","Desalination uses a lot of fuel and electricity, so water is precious."],["Saving water","Short showers, fixing leaks and turning off taps help everyone.","Responsibility: something you should do for yourself and others."]],
 quiz:[["Where do many families collect rainwater?","From their roofs","From the sea","From the airport"],["What happens if we use too much groundwater?","It turns salty","It turns into ice","Nothing"],["What does desalination do?","Removes salt from sea water","Adds salt to water","Makes rain"],["Why is desalinated water precious?","It uses lots of energy","It is free forever","It is unhealthy"],["Which saves water?","Fixing a leaking tap","Leaving the tap running","Long showers"]]},

/* ===== Grade 5 extra ===== */
{id:"g5-sultans", grade:5, strand:"time", pic:"👑", title:"Kings and sultans", blurb:"Over 800 years of royal rule.",
 cards:[["Royal rule","For hundreds of years the Maldives was ruled by kings, and after 1153 by sultans."],["Dynasties","A dynasty is a family of rulers. Maldivian dynasties include the Theemuge, Hilaaly, Utheemu and Huraa."],["The Utheemu dynasty","Muhammad Thakurufaanu became sultan after 1573, starting the Utheemu dynasty."],["The last sultan","The Huraa dynasty was the last. The sultanate ended when the Maldives became a republic in 1968."],["Muliaage","Muliaage in Malé was built in the early 1900s for the royal family. It later became the President’s official home."]],
 quiz:[["What is a dynasty?","A family of rulers","A type of boat","An island"],["Which dynasty started with Muhammad Thakurufaanu?","Utheemu","Huraa","Hilaaly"],["Which was the last dynasty?","Huraa","Theemuge","Utheemu"],["When did the sultanate end?","1968","1153","1573"],["What did Muliaage later become?","The President’s official home","A fish market","A school"]]},
{id:"g5-dialects", grade:5, strand:"culture", pic:"🗣️", title:"Island life from north to south", blurb:"Different dialects and customs across the atolls.",
 cards:[["One language, many voices","All Maldivians speak Dhivehi, but people in different atolls speak it in different ways."],["Dialects","A dialect is a way of speaking a language in one area. Addu, Fuvahmulah and Huvadhoo have dialects very different from Malé."],["Southern atolls","The southern dialects keep many old words that are no longer used in Malé."],["Local customs","Atolls have their own foods, crafts and songs, such as lacquer work in Baa or mat weaving in Gaafu Dhaalu."],["Unity in diversity","Our differences make our culture richer, and our shared faith and language unite us.","Diversity: having many different kinds."]],
 quiz:[["What is a dialect?","A way of speaking a language in one area","A different country","A kind of food"],["Which areas have very different dialects?","Addu, Fuvahmulah and Huvadhoo","Only Malé","None"],["What do the southern dialects keep?","Many old words","No words","Only English words"],["What unites Maldivians?","Shared faith and language","Everyone talks the same","Living on one island"],
  {t:"map", q:"Fuvahmulah has its own dialect. Tap Fuvahmulah.", place:"Fuvahmulah"}]},
{id:"g5-energy", grade:5, strand:"econ", pic:"🔆", title:"Energy and fuel", blurb:"Powering islands with diesel and the sun.",
 cards:[["Island power","Each inhabited island needs its own power station, because islands are far apart."],["Diesel","Most electricity in the Maldives comes from diesel generators. All the fuel is imported."],["The cost","Buying fuel costs the country a lot of money, and burning it pollutes the air."],["Solar power","The Maldives gets strong sunshine all year, so more islands are adding solar panels."],["Saving energy","Turning off lights and fans, and using air conditioning wisely, saves fuel and money.","Renewable energy comes from sources that do not run out, like the sun and wind."]],
 quiz:[["Where does most electricity in the Maldives come from?","Diesel generators","Coal mines","Rivers"],["Why does each island need its own power station?","Islands are far apart","Islands are joined","It is a rule from Japan"],["Which is renewable energy?","Solar power","Diesel","Petrol"],["Why is solar a good fit for the Maldives?","Strong sunshine all year","It snows a lot","It is always dark"],["How can you save energy?","Turn off lights you don’t need","Leave the fan on all day","Open the fridge often"]]},
{id:"g5-media", grade:5, strand:"inquiry", pic:"📰", title:"News and media", blurb:"Where news comes from and how to judge it.",
 cards:[["What is media?","Media are ways of sharing information with many people: newspapers, radio, TV, websites and social media."],["Radio and TV","Radio broadcasting began in the Maldives in 1962. Television Maldives (TVM) started in 1978."],["Online news","Today many people read news online, often on their phones."],["Fake news","Some stories online are false. Before sharing, check who wrote it and whether trusted sources say the same."],["Bias","Bias means showing only one side. Good readers look for more than one point of view."]],
 quiz:[["Which is a type of media?","Television","A coconut","A dhoni"],["When did TVM start?","1978","1878","2008"],["What should you do before sharing a news story?","Check if trusted sources agree","Share it fast","Add your own made-up facts"],["What is bias?","Showing only one side","Telling every side","A type of radio"],
  {t:"sort", q:"Trustworthy or check carefully?", bins:["More trustworthy","Check carefully"], items:[["A government website",0],["A viral message with no author",1],["An official school notice",0],["A shocking post with no source",1]]}]},

/* ===== Grade 6 extra ===== */
{id:"g6-protect", grade:6, strand:"time", pic:"🇬🇧", title:"British protection, 1887–1965", blurb:"How the Maldives became a protectorate and then independent.",
 cards:[["A protectorate","In 1887 the Maldives became a British protectorate. Britain handled foreign affairs and defence; Maldivians ran their own internal affairs."],["Gan","From 1957 to 1976, Britain’s Royal Air Force had a base on Gan in Addu Atoll."],["Working at Gan","Many people from Addu worked at the base, which brought jobs but also tension with the government in Malé."],["Independence","On 26 July 1965, an agreement signed in Colombo ended British protection. The Maldives became fully independent."],["After independence","The Maldives joined the United Nations in 1965 and the last British forces left Gan in 1976.","Protectorate: a country protected and partly controlled by a stronger one."]],
 quiz:[["In what year did the Maldives become a British protectorate?","1887","1965","1153"],["What did Britain control during the protectorate?","Foreign affairs and defence","Every island council","Fishing boats"],["Where was the British air base?","Gan, in Addu Atoll","Malé","Fuvahmulah"],["When did British protection end?","26 July 1965","11 November 1968","1 January 1900"],
  {t:"map", q:"Tap Addu City, where Gan is.", place:"Addu City"}]},
{id:"g6-ocean", grade:6, strand:"place", pic:"🌊", title:"The Indian Ocean and our neighbours", blurb:"Our place in the region and our huge sea area.",
 cards:[["Our neighbours","Our closest neighbours are India to the north and Sri Lanka to the northeast."],["Island chains","The Lakshadweep islands lie to the north and the Chagos islands to the south. They sit on the same undersea ridge as the Maldives."],["More sea than land","The Maldives has only about 300 square kilometres of land, but controls about 900,000 square kilometres of sea."],["The EEZ","This sea area is our Exclusive Economic Zone. Only the Maldives may fish and use resources there."],["Shipping lanes","Busy shipping routes between Asia, the Middle East and Africa pass close to our atolls.","Exclusive Economic Zone (EEZ): the sea area where a country has special rights to its resources."]],
 quiz:[["Which country is our neighbour to the north?","India","Brazil","Japan"],["Which island chain lies to the south?","Chagos","Lakshadweep","Hawaii"],["About how much land does the Maldives have?","300 square kilometres","300,000 square kilometres","3 square kilometres"],["What is an EEZ?","Sea where a country has special rights to resources","A type of boat","An island council"],["Is the Maldives mostly land or sea?","Mostly sea","Mostly land","Half and half"]]},
{id:"g6-trade", grade:6, strand:"econ", pic:"🚢", title:"Trade and the economy", blurb:"Imports, exports and earning foreign money.",
 cards:[["Trade","Trade is buying and selling between countries."],["More imports than exports","The Maldives imports much more than it exports: food, fuel, cars, building materials and medicine."],["Trade deficit","When a country imports more than it exports, it has a trade deficit."],["Foreign currency","Tourism brings in US dollars and other foreign money, which helps pay for imports."],["Strengthening the economy","Growing more food, using solar power and supporting local businesses can reduce imports.","Economy: how a country makes, buys and sells goods and services."]],
 quiz:[["What is trade?","Buying and selling between countries","Fishing for fun","Building houses"],["Does the Maldives import more or export more?","Import more","Export more","Exactly the same"],["What is a trade deficit?","Importing more than exporting","Exporting more than importing","Having no money"],["What brings foreign currency into the Maldives?","Tourism","Rain","Coral"],
  {t:"sort", q:"Import or export?", bins:["Import","Export"], items:[["Fuel",0],["Tuna",1],["Cars",0],["Rice",0]]}]},
{id:"g6-global", grade:6, strand:"citizen", pic:"🌐", title:"Global citizens", blurb:"The Sustainable Development Goals and how we can help.",
 cards:[["A global citizen","A global citizen cares about people and the planet, not only their own island."],["The SDGs","In 2015, United Nations members agreed 17 Sustainable Development Goals (SDGs) to reach by 2030."],["Some goals","The goals include no poverty, quality education, clean water, climate action and life below water."],["Why it matters to us","Goals like climate action and life below water are especially important for an island nation."],["Acting locally","Beach clean-ups, saving energy and helping classmates are ways to work towards the goals.","Sustainable: meeting our needs without harming future generations."]],
 quiz:[["How many Sustainable Development Goals are there?","17","5","100"],["When were the SDGs agreed?","2015","1965","1990"],["Which SDG is very important for the Maldives?","Life below water","Life on the Moon","Winter sports"],["What does sustainable mean?","Meeting needs without harming the future","Using everything up","Buying more"],["Which is acting locally?","A beach clean-up","Ignoring rubbish","Wasting water"]]}
);

const LESSONS = RAW_LESSONS.map(l => {
  const cards = (G1_CARDS[l.id] || l.cards).map(([h,t,w]) => ({h,t,w}));
  const quiz = l.quiz.concat(EXTRA_Q[l.id] || []).map((x,i) => {
    if(!Array.isArray(x)) return Object.assign({qid:l.id+":"+i}, x);
    const [q,right,...rest] = x; const w = rest.length > 2 ? rest.pop() : undefined;
    return {qid:l.id+":"+i, t:"mc", q, a:[right,...rest], w};
  });
  return Object.assign({}, l, {stage: l.grade <= 3 ? 1 : 2, cards, quiz});
});

export {LESSONS};
