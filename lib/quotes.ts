// A diverse collection of inspirational quotes from around the world
const quotes = [
  // AFRICA
  { text: "If you want to go quickly, go alone. If you want to go far, go together.", author: "African Proverb" },
  {
    text: "Until the lion tells his side of the story, the tale of the hunt will always glorify the hunter.",
    author: "African Proverb",
  },
  { text: "However long the night, the dawn will break.", author: "African Proverb" },
  { text: "When there is no enemy within, the enemies outside cannot hurt you.", author: "African Proverb" },
  { text: "The fool speaks, the wise man listens.", author: "Ethiopian Proverb" },
  { text: "He who learns, teaches.", author: "Ethiopian Proverb" },
  { text: "Where you will sit when you are old shows where you stood in youth.", author: "Yoruba Proverb" },
  { text: "If you close your eyes to facts, you will learn through accidents.", author: "African Proverb" },
  { text: "The eye never forgets what the heart has seen.", author: "African Proverb" },
  { text: "A leader who does not take advice is not a leader.", author: "Kenyan Proverb" },
  { text: "A tree is known by its fruits.", author: "African Proverb" },
  { text: "A child is a child of everyone.", author: "Sudanese Proverb" },
  { text: "All monkeys cannot hang on the same branch.", author: "Kenyan Proverb" },
  { text: "An army of sheep led by a lion can defeat an army of lions led by a sheep.", author: "African Proverb" },
  { text: "Wisdom is like a baobab tree; no one individual can embrace it.", author: "African Proverb" },
  { text: "The axe forgets; the tree remembers.", author: "African Proverb" },
  { text: "Even the lion, the king of the forest, protects himself against flies.", author: "African Proverb" },
  { text: "It takes a village to raise a child.", author: "African Proverb" },
  { text: "Not to know is bad; not to wish to know is worse.", author: "Nigerian Proverb" },
  { text: "When a king has good counselors, his reign is peaceful.", author: "Ashanti Proverb" },
  { text: "Education is the most powerful weapon which you can use to change the world.", author: "Nelson Mandela" },
  {
    text: "For to be free is not merely to cast off one's chains, but to live in a way that respects and enhances the freedom of others.",
    author: "Nelson Mandela",
  },
  { text: "I am not African because I was born in Africa but because Africa was born in me.", author: "Kwame Nkrumah" },
  {
    text: "If you are neutral in situations of injustice, you have chosen the side of the oppressor.",
    author: "Desmond Tutu",
  },
  {
    text: "We must use time wisely and forever realize that the time is always ripe to do right.",
    author: "Nelson Mandela",
  },
  {
    text: "There is no passion to be found playing small - in settling for a life that is less than the one you are capable of living.",
    author: "Nelson Mandela",
  },
  {
    text: "The greatest glory in living lies not in never falling, but in rising every time we fall.",
    author: "Nelson Mandela",
  },
  { text: "A winner is a dreamer who never gives up.", author: "Nelson Mandela" },
  {
    text: "No one is born hating another person because of the color of his skin, or his background, or his religion.",
    author: "Nelson Mandela",
  },
  { text: "It always seems impossible until it's done.", author: "Nelson Mandela" },
  {
    text: "Do not judge me by my successes, judge me by how many times I fell down and got back up again.",
    author: "Nelson Mandela",
  },
  {
    text: "If you talk to a man in a language he understands, that goes to his head. If you talk to him in his language, that goes to his heart.",
    author: "Nelson Mandela",
  },
  { text: "I learned that courage was not the absence of fear, but the triumph over it.", author: "Nelson Mandela" },
  { text: "A good head and a good heart are always a formidable combination.", author: "Nelson Mandela" },

  // ASIA
  { text: "Be the change that you wish to see in the world.", author: "Mahatma Gandhi" },
  { text: "In a gentle way, you can shake the world.", author: "Mahatma Gandhi" },
  { text: "The future depends on what you do today.", author: "Mahatma Gandhi" },
  { text: "Live as if you were to die tomorrow. Learn as if you were to live forever.", author: "Mahatma Gandhi" },
  {
    text: "Strength does not come from physical capacity. It comes from an indomitable will.",
    author: "Mahatma Gandhi",
  },
  { text: "The weak can never forgive. Forgiveness is the attribute of the strong.", author: "Mahatma Gandhi" },
  { text: "An eye for an eye only ends up making the whole world blind.", author: "Mahatma Gandhi" },
  { text: "Happiness is when what you think, what you say, and what you do are in harmony.", author: "Mahatma Gandhi" },
  { text: "A man is but the product of his thoughts. What he thinks, he becomes.", author: "Mahatma Gandhi" },
  { text: "The best way to find yourself is to lose yourself in the service of others.", author: "Mahatma Gandhi" },
  {
    text: "You must not lose faith in humanity. Humanity is like an ocean; if a few drops of the ocean are dirty, the ocean does not become dirty.",
    author: "Mahatma Gandhi",
  },
  { text: "Nobody can hurt me without my permission.", author: "Mahatma Gandhi" },
  { text: "Earth provides enough to satisfy every man's needs, but not every man's greed.", author: "Mahatma Gandhi" },
  { text: "The mind is everything. What you think you become.", author: "Buddha" },
  {
    text: "Do not dwell in the past, do not dream of the future, concentrate the mind on the present moment.",
    author: "Buddha",
  },
  { text: "Three things cannot be long hidden: the sun, the moon, and the truth.", author: "Buddha" },
  {
    text: "Health is the greatest gift, contentment the greatest wealth, faithfulness the best relationship.",
    author: "Buddha",
  },
  { text: "Peace comes from within. Do not seek it without.", author: "Buddha" },
  {
    text: "No one saves us but ourselves. No one can and no one may. We ourselves must walk the path.",
    author: "Buddha",
  },
  {
    text: "Thousands of candles can be lighted from a single candle, and the life of the candle will not be shortened. Happiness never decreases by being shared.",
    author: "Buddha",
  },
  { text: "You will not be punished for your anger, you will be punished by your anger.", author: "Buddha" },
  {
    text: "Holding on to anger is like grasping a hot coal with the intent of throwing it at someone else; you are the one who gets burned.",
    author: "Buddha",
  },
  { text: "The way is not in the sky. The way is in the heart.", author: "Buddha" },
  {
    text: "You, yourself, as much as anybody in the entire universe, deserve your love and affection.",
    author: "Buddha",
  },
  {
    text: "It is better to conquer yourself than to win a thousand battles. Then the victory is yours. It cannot be taken from you.",
    author: "Buddha",
  },
  {
    text: "We are shaped by our thoughts; we become what we think. When the mind is pure, joy follows like a shadow that never leaves.",
    author: "Buddha",
  },
  { text: "Better than a thousand hollow words, is one word that brings peace.", author: "Buddha" },
  { text: "The journey of a thousand miles begins with one step.", author: "Lao Tzu" },
  { text: "Knowing others is wisdom, knowing yourself is Enlightenment.", author: "Lao Tzu" },
  { text: "When I let go of what I am, I become what I might be.", author: "Lao Tzu" },
  { text: "Nature does not hurry, yet everything is accomplished.", author: "Lao Tzu" },
  { text: "A good traveler has no fixed plans, and is not intent on arriving.", author: "Lao Tzu" },
  { text: "If you do not change direction, you may end up where you are heading.", author: "Lao Tzu" },
  { text: "To the mind that is still, the whole universe surrenders.", author: "Lao Tzu" },
  { text: "Silence is a source of great strength.", author: "Lao Tzu" },
  {
    text: "Be content with what you have; rejoice in the way things are. When you realize there is nothing lacking, the whole world belongs to you.",
    author: "Lao Tzu",
  },
  {
    text: "Kindness in words creates confidence. Kindness in thinking creates profoundness. Kindness in giving creates love.",
    author: "Lao Tzu",
  },
  { text: "He who knows, does not speak. He who speaks, does not know.", author: "Lao Tzu" },
  {
    text: "When you are content to be simply yourself and don't compare or compete, everyone will respect you.",
    author: "Lao Tzu",
  },
  { text: "The best fighter is never angry.", author: "Lao Tzu" },
  { text: "Care about what other people think and you will always be their prisoner.", author: "Lao Tzu" },
  { text: "Simplicity, patience, compassion. These three are your greatest treasures.", author: "Lao Tzu" },
  { text: "Learn to be comfortable in the uncomfortable.", author: "Malala Yousafzai" },
  { text: "When the whole world is silent, even one voice becomes powerful.", author: "Malala Yousafzai" },
  { text: "One child, one teacher, one book, one pen can change the world.", author: "Malala Yousafzai" },
  {
    text: "I tell my story not because it is unique, but because it is the story of many girls.",
    author: "Malala Yousafzai",
  },
  {
    text: "I raise up my voice—not so I can shout, but so that those without a voice can be heard.",
    author: "Malala Yousafzai",
  },
  { text: "We realize the importance of our voices only when we are silenced.", author: "Malala Yousafzai" },
  { text: "If one man can destroy everything, why can't one girl change it?", author: "Malala Yousafzai" },
  {
    text: "I don't want to be remembered as the girl who was shot. I want to be remembered as the girl who stood up.",
    author: "Malala Yousafzai",
  },
  { text: "With guns you can kill terrorists, with education you can kill terrorism.", author: "Malala Yousafzai" },
  { text: "I believe in peace. I believe in mercy.", author: "Malala Yousafzai" },

  // EUROPE
  { text: "Life is what happens when you're busy making other plans.", author: "John Lennon" },
  { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
  { text: "Creativity is intelligence having fun.", author: "Albert Einstein" },
  { text: "The best way to predict the future is to create it.", author: "Peter Drucker" },
  { text: "Simplicity is the ultimate sophistication.", author: "Leonardo da Vinci" },
  { text: "In the middle of difficulty lies opportunity.", author: "Albert Einstein" },
  { text: "Everything you can imagine is real.", author: "Pablo Picasso" },
  { text: "The only limit to our realization of tomorrow is our doubts of today.", author: "Franklin D. Roosevelt" },
  { text: "The best revenge is massive success.", author: "Frank Sinatra" },
  { text: "If you want to live a happy life, tie it to a goal, not to people or things.", author: "Albert Einstein" },
  {
    text: "Do not go where the path may lead, go instead where there is no path and leave a trail.",
    author: "Ralph Waldo Emerson",
  },
  { text: "Be yourself; everyone else is already taken.", author: "Oscar Wilde" },
  { text: "Whether you think you can or you think you can't, you're right.", author: "Henry Ford" },
  {
    text: "Many of life's failures are people who did not realize how close they were to success when they gave up.",
    author: "Thomas Edison",
  },
  {
    text: "If you set your goals ridiculously high and it's a failure, you will fail above everyone else's success.",
    author: "James Cameron",
  },
  { text: "The question isn't who is going to let me; it's who is going to stop me.", author: "Ayn Rand" },
  { text: "When you reach the end of your rope, tie a knot in it and hang on.", author: "Franklin D. Roosevelt" },
  { text: "Always remember that you are absolutely unique. Just like everyone else.", author: "Margaret Mead" },
  {
    text: "Don't judge each day by the harvest you reap but by the seeds that you plant.",
    author: "Robert Louis Stevenson",
  },
  { text: "Tell me and I forget. Teach me and I remember. Involve me and I learn.", author: "Benjamin Franklin" },
  {
    text: "The best and most beautiful things in the world cannot be seen or even touched — they must be felt with the heart.",
    author: "Helen Keller",
  },
  { text: "It is during our darkest moments that we must focus to see the light.", author: "Aristotle" },
  { text: "Whoever is happy will make others happy too.", author: "Anne Frank" },
  { text: "You will face many defeats in life, but never let yourself be defeated.", author: "Maya Angelou" },
  {
    text: "In the end, it's not the years in your life that count. It's the life in your years.",
    author: "Abraham Lincoln",
  },
  { text: "Never let the fear of striking out keep you from playing the game.", author: "Babe Ruth" },
  { text: "Life is either a daring adventure or nothing at all.", author: "Helen Keller" },
  {
    text: "You have brains in your head. You have feet in your shoes. You can steer yourself any direction you choose.",
    author: "Dr. Seuss",
  },
  { text: "If life were predictable it would cease to be life and be without flavor.", author: "Eleanor Roosevelt" },
  {
    text: "If you look at what you have in life, you'll always have more. If you look at what you don't have in life, you'll never have enough.",
    author: "Oprah Winfrey",
  },
  {
    text: "Spread love everywhere you go. Let no one ever come to you without leaving happier.",
    author: "Mother Teresa",
  },
  {
    text: "The best and most beautiful things in the world cannot be seen or even touched - they must be felt with the heart.",
    author: "Helen Keller",
  },
  {
    text: "Success is not final, failure is not fatal: It is the courage to continue that counts.",
    author: "Winston Churchill",
  },
  {
    text: "The real test is not whether you avoid this failure, because you won't. It's whether you let it harden or shame you into inaction, or whether you learn from it.",
    author: "Barack Obama",
  },

  // NORTH AMERICA
  { text: "Stay hungry, stay foolish.", author: "Steve Jobs" },
  { text: "Your time is limited, don't waste it living someone else's life.", author: "Steve Jobs" },
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { text: "Innovation distinguishes between a leader and a follower.", author: "Steve Jobs" },
  { text: "Design is not just what it looks like and feels like. Design is how it works.", author: "Steve Jobs" },
  {
    text: "Be a yardstick of quality. Some people aren't used to an environment where excellence is expected.",
    author: "Steve Jobs",
  },
  { text: "Sometimes life hits you in the head with a brick. Don't lose faith.", author: "Steve Jobs" },
  { text: "I want to put a ding in the universe.", author: "Steve Jobs" },
  {
    text: "Quality is more important than quantity. One home run is much better than two doubles.",
    author: "Steve Jobs",
  },
  {
    text: "You can't connect the dots looking forward; you can only connect them looking backwards.",
    author: "Steve Jobs",
  },
  { text: "The way to get started is to quit talking and begin doing.", author: "Walt Disney" },
  { text: "All our dreams can come true, if we have the courage to pursue them.", author: "Walt Disney" },
  { text: "It's kind of fun to do the impossible.", author: "Walt Disney" },
  { text: "If you can dream it, you can do it.", author: "Walt Disney" },
  {
    text: "The more you like yourself, the less you are like anyone else, which makes you unique.",
    author: "Walt Disney",
  },
  {
    text: "When you believe in a thing, believe in it all the way, implicitly and unquestionable.",
    author: "Walt Disney",
  },
  {
    text: "All the adversity I've had in my life, all my troubles and obstacles, have strengthened me.",
    author: "Walt Disney",
  },
  { text: "The difference in winning and losing is most often not quitting.", author: "Walt Disney" },
  {
    text: "The past can hurt. But the way I see it, you can either run from it, or learn from it.",
    author: "Walt Disney",
  },
  { text: "Laughter is timeless, imagination has no age, and dreams are forever.", author: "Walt Disney" },
  { text: "That's the real trouble with the world. Too many people grow up.", author: "Walt Disney" },
  { text: "The way I see it, if you want the rainbow, you gotta put up with the rain.", author: "Dolly Parton" },
  { text: "Find out who you are and do it on purpose.", author: "Dolly Parton" },
  { text: "If you don't like the road you're walking, start paving another one.", author: "Dolly Parton" },
  { text: "The magic is inside you. There ain't no crystal ball.", author: "Dolly Parton" },
  { text: "Don't get so busy making a living that you forget to make a life.", author: "Dolly Parton" },
  { text: "You'll never do a whole lot unless you're brave enough to try.", author: "Dolly Parton" },
  { text: "Storms make trees take deeper roots.", author: "Dolly Parton" },
  {
    text: "If your actions create a legacy that inspires others to dream more, learn more, do more and become more, then, you are an excellent leader.",
    author: "Dolly Parton",
  },
  { text: "It's hard to be a diamond in a rhinestone world.", author: "Dolly Parton" },
  { text: "We cannot direct the wind, but we can adjust the sails.", author: "Dolly Parton" },
  { text: "I always count my blessings more than I count my money.", author: "Dolly Parton" },

  // SOUTH AMERICA
  { text: "I am not a woman whose self-worth comes from her dress size.", author: "Isabel Allende" },
  { text: "Write what should not be forgotten.", author: "Isabel Allende" },
  {
    text: "You are the storyteller of your own life, and you can create your own legend, or not.",
    author: "Isabel Allende",
  },
  {
    text: "Accept the children the way we accept trees—with gratitude, because they are a blessing—but do not have expectations or desires. You don't expect trees to change, you love them as they are.",
    author: "Isabel Allende",
  },
  {
    text: "We don't even know how strong we are until we are forced to bring that hidden strength forward.",
    author: "Isabel Allende",
  },
  {
    text: "The longer I live, the more uninformed I feel. Only the young have an explanation for everything.",
    author: "Isabel Allende",
  },
  {
    text: "Fear is inevitable, I have to accept that, but I cannot allow it to paralyze me.",
    author: "Isabel Allende",
  },
  {
    text: "I can promise you that women working together – linked, informed and educated – can bring peace and prosperity to this forsaken planet.",
    author: "Isabel Allende",
  },
  { text: "Heart is what drives us and determines our fate.", author: "Isabel Allende" },
  { text: "The universe is conspiring in our favor at this moment.", author: "Paulo Coelho" },
  {
    text: "One day you will wake up and there won't be any more time to do the things you've always wanted. Do it now.",
    author: "Paulo Coelho",
  },
  {
    text: "And, when you want something, all the universe conspires in helping you to achieve it.",
    author: "Paulo Coelho",
  },
  {
    text: "When we love, we always strive to become better than we are. When we strive to become better than we are, everything around us becomes better too.",
    author: "Paulo Coelho",
  },
  { text: "The secret of life, though, is to fall seven times and to get up eight times.", author: "Paulo Coelho" },
  {
    text: "The simple things are also the most extraordinary things, and only the wise can see them.",
    author: "Paulo Coelho",
  },
  {
    text: "Everyone seems to have a clear idea of how other people should lead their lives, but none about his or her own.",
    author: "Paulo Coelho",
  },
  { text: "Remember that wherever your heart is, there you will find your treasure.", author: "Paulo Coelho" },
  {
    text: "There is only one thing that makes a dream impossible to achieve: the fear of failure.",
    author: "Paulo Coelho",
  },
  { text: "When you want something, all the universe conspires in helping you to achieve it.", author: "Paulo Coelho" },
  { text: "People never learn anything by being told, they have to find out for themselves.", author: "Paulo Coelho" },
  {
    text: "Nothing in the world is ever completely wrong. Even a stopped clock is right twice a day.",
    author: "Paulo Coelho",
  },
  { text: "When someone leaves, it's because someone else is about to arrive.", author: "Paulo Coelho" },
  { text: "If you're brave enough to say goodbye, life will reward you with a new hello.", author: "Paulo Coelho" },
  { text: "Don't waste your time with explanations: people only hear what they want to hear.", author: "Paulo Coelho" },
  {
    text: "Waiting is painful. Forgetting is painful. But not knowing which to do is the worst kind of suffering.",
    author: "Paulo Coelho",
  },

  // AUSTRALIA/OCEANIA
  {
    text: "Life is not measured by the number of breaths we take, but by the moments that take our breath away.",
    author: "Maya Angelou",
  },
  {
    text: "I've learned that people will forget what you said, people will forget what you did, but people will never forget how you made them feel.",
    author: "Maya Angelou",
  },
  {
    text: "If you don't like something, change it. If you can't change it, change your attitude.",
    author: "Maya Angelou",
  },
  { text: "Try to be a rainbow in someone's cloud.", author: "Maya Angelou" },
  { text: "We may encounter many defeats but we must not be defeated.", author: "Maya Angelou" },
  { text: "You can't use up creativity. The more you use, the more you have.", author: "Maya Angelou" },
  {
    text: "I've learned that whenever I decide something with an open heart, I usually make the right decision.",
    author: "Maya Angelou",
  },
  {
    text: "Love recognizes no barriers. It jumps hurdles, leaps fences, penetrates walls to arrive at its destination full of hope.",
    author: "Maya Angelou",
  },
  {
    text: "If you are always trying to be normal, you will never know how amazing you can be.",
    author: "Maya Angelou",
  },
  {
    text: "You may not control all the events that happen to you, but you can decide not to be reduced by them.",
    author: "Maya Angelou",
  },
  {
    text: "My mission in life is not merely to survive, but to thrive; and to do so with some passion, some compassion, some humor, and some style.",
    author: "Maya Angelou",
  },
  { text: "Success is liking yourself, liking what you do, and liking how you do it.", author: "Maya Angelou" },
  { text: "Nothing will work unless you do.", author: "Maya Angelou" },
  { text: "I can be changed by what happens to me. But I refuse to be reduced by it.", author: "Maya Angelou" },
  {
    text: "You may encounter many defeats, but you must not be defeated. In fact, it may be necessary to encounter the defeats, so you can know who you are, what you can rise from, how you can still come out of it.",
    author: "Maya Angelou",
  },
  {
    text: "We delight in the beauty of the butterfly, but rarely admit the changes it has gone through to achieve that beauty.",
    author: "Maya Angelou",
  },
  { text: "If one is lucky, a solitary fantasy can totally transform one million realities.", author: "Maya Angelou" },
  { text: "Never make someone a priority when all you are to them is an option.", author: "Maya Angelou" },
  {
    text: "A wise woman wishes to be no one's enemy; a wise woman refuses to be anyone's victim.",
    author: "Maya Angelou",
  },
  { text: "Have enough courage to trust love one more time and always one more time.", author: "Maya Angelou" },

  // ANTARCTICA (Researchers/Explorers)
  { text: "Difficulties are just things to overcome, after all.", author: "Ernest Shackleton" },
  { text: "I believe it is in our nature to explore, to reach out into the unknown.", author: "Ernest Shackleton" },
  { text: "Optimism is true moral courage.", author: "Ernest Shackleton" },
  { text: "By endurance we conquer.", author: "Ernest Shackleton" },
  {
    text: "No person who has not spent a period of his life in those 'stark and sullen solitudes that sentinel the Pole' will understand fully what trees and flowers, sun-flecked turf and running streams mean to the soul of a man.",
    author: "Ernest Shackleton",
  },
  {
    text: "I called to the other men that the sky was clearing, and then a moment later I realized that what I had seen was not a rift in the clouds but the white crest of an enormous wave.",
    author: "Ernest Shackleton",
  },
  { text: "The only true failure would be not to explore at all.", author: "Ernest Shackleton" },
  {
    text: "Leadership is a fine thing, but it has its penalties. And the greatest penalty is loneliness.",
    author: "Ernest Shackleton",
  },
  {
    text: "Men wanted for hazardous journey. Low wages, bitter cold, long hours of complete darkness. Safe return doubtful. Honour and recognition in event of success.",
    author: "Ernest Shackleton",
  },
  { text: "Superhuman effort isn't worth a damn unless it achieves results.", author: "Ernest Shackleton" },
  {
    text: "The world is a fine place and worth fighting for and I hate very much to leave it.",
    author: "Ernest Hemingway",
  },
  {
    text: "There is nothing noble in being superior to your fellow man; true nobility is being superior to your former self.",
    author: "Ernest Hemingway",
  },
  { text: "The best way to find out if you can trust somebody is to trust them.", author: "Ernest Hemingway" },
  { text: "Courage is grace under pressure.", author: "Ernest Hemingway" },
  { text: "There is no friend as loyal as a book.", author: "Ernest Hemingway" },

  // ADDITIONAL QUOTES FROM AROUND THE WORLD
  { text: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius" },
  { text: "What we think, we become.", author: "Buddha" },
  { text: "The purpose of our lives is to be happy.", author: "Dalai Lama" },
  { text: "You must be the change you wish to see in the world.", author: "Mahatma Gandhi" },
  { text: "The only impossible journey is the one you never begin.", author: "Tony Robbins" },
  { text: "You only live once, but if you do it right, once is enough.", author: "Mae West" },
  { text: "Life is really simple, but we insist on making it complicated.", author: "Confucius" },
  { text: "Life is what we make it, always has been, always will be.", author: "Grandma Moses" },
  { text: "Spread love everywhere you go.", author: "Mother Teresa" },
  { text: "Dream big and dare to fail.", author: "Norman Vaughan" },
  {
    text: "Our lives begin to end the day we become silent about things that matter.",
    author: "Martin Luther King Jr.",
  },
  { text: "Do what you can, where you are, with what you have.", author: "Teddy Roosevelt" },
  { text: "If you do what you've always done, you'll get what you've always gotten.", author: "Tony Robbins" },
  { text: "Dreaming, after all, is a form of planning.", author: "Gloria Steinem" },
  {
    text: "It's your place in the world; it's your life. Go on and do all you can with it, and make it the life you want to live.",
    author: "Mae Jemison",
  },
  { text: "You may be disappointed if you fail, but you are doomed if you don't try.", author: "Beverly Sills" },
  { text: "Remember no one can make you feel inferior without your consent.", author: "Eleanor Roosevelt" },
  { text: "Life is what we make it, always has been, always will be.", author: "Grandma Moses" },
  { text: "The question isn't who is going to let me; it's who is going to stop me.", author: "Ayn Rand" },
  {
    text: "When everything seems to be going against you, remember that the airplane takes off against the wind, not with it.",
    author: "Henry Ford",
  },
  { text: "It's not the years in your life that count. It's the life in your years.", author: "Abraham Lincoln" },
  { text: "Change your thoughts and you change your world.", author: "Norman Vincent Peale" },
  { text: "Either write something worth reading or do something worth writing.", author: "Benjamin Franklin" },
  { text: "Nothing is impossible, the word itself says, 'I'm possible!'", author: "Audrey Hepburn" },
  { text: "If you can dream it, you can achieve it.", author: "Zig Ziglar" },
  { text: "Don't count the days, make the days count.", author: "Muhammad Ali" },
  { text: "The secret of getting ahead is getting started.", author: "Mark Twain" },
  { text: "I find that the harder I work, the more luck I seem to have.", author: "Thomas Jefferson" },
  { text: "Happiness is not something ready-made. It comes from your own actions.", author: "Dalai Lama" },
  { text: "If you want to lift yourself up, lift up someone else.", author: "Booker T. Washington" },
  { text: "You miss 100% of the shots you don't take.", author: "Wayne Gretzky" },
  { text: "Every strike brings me closer to the next home run.", author: "Babe Ruth" },
  { text: "Life is 10% what happens to me and 90% of how I react to it.", author: "Charles Swindoll" },
  { text: "Too many of us are not living our dreams because we are living our fears.", author: "Les Brown" },
  { text: "I attribute my success to this: I never gave or took any excuse.", author: "Florence Nightingale" },
  { text: "I would rather die of passion than of boredom.", author: "Vincent van Gogh" },
  {
    text: "Twenty years from now you will be more disappointed by the things that you didn't do than by the ones you did do.",
    author: "Mark Twain",
  },
  {
    text: "Great minds discuss ideas; average minds discuss events; small minds discuss people.",
    author: "Eleanor Roosevelt",
  },
  {
    text: "A successful man is one who can lay a firm foundation with the bricks others have thrown at him.",
    author: "David Brinkley",
  },
  { text: "Those who dare to fail miserably can achieve greatly.", author: "John F. Kennedy" },
  { text: "Love yourself first and everything else falls into line.", author: "Lucille Ball" },
  {
    text: "Let us always meet each other with smile, for the smile is the beginning of love.",
    author: "Mother Teresa",
  },
  {
    text: "Challenges are what make life interesting and overcoming them is what makes life meaningful.",
    author: "Joshua J. Marine",
  },
  { text: "Love is a fruit in season at all times, and within reach of every hand.", author: "Mother Teresa" },
  {
    text: "Being deeply loved by someone gives you strength, while loving someone deeply gives you courage.",
    author: "Lao Tzu",
  },
  { text: "The only person you are destined to become is the person you decide to be.", author: "Ralph Waldo Emerson" },
  {
    text: "Go confidently in the direction of your dreams. Live the life you have imagined.",
    author: "Henry David Thoreau",
  },
  { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
  { text: "Everything you've ever wanted is on the other side of fear.", author: "George Addair" },
  { text: "What we achieve inwardly will change outer reality.", author: "Plutarch" },
  { text: "Build your own dreams, or someone else will hire you to build theirs.", author: "Farrah Gray" },
  { text: "Education costs money. But then so does ignorance.", author: "Sir Claus Moser" },
]

export async function getRandomQuote() {
  // In a real app, you might fetch from an API
  // For now, we'll use our local collection
  const randomIndex = Math.floor(Math.random() * quotes.length)
  return quotes[randomIndex]
}
