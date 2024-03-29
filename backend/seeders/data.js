const User = require("../models/Users");

const seedUsers = async () => {
  return [
    {
      username: "Demo",
      password: await User.hashPassword("password"),
    },
    {
      username: "Batman",
      password: await User.hashPassword("luckyguy11"),
      profilePicture:
        "https://imgix.ranker.com/user_node_img/28/549942/original/batman-photo-u179?auto=format&q=60&fit=crop&fm=pjpg&dpr=2&crop=faces&h=150&w=150",
    },
    {
      username: "Flash",
      password: await User.hashPassword("luckyguy11"),
      profilePicture:
        "https://imgix.ranker.com/node_img/50/998295/original/flash-comic-book-characters-photo-1?auto=format&q=60&fit=crop&fm=pjpg&dpr=2&crop=faces&h=150&w=150",
    },
    {
      username: "WonderWoman",
      password: await User.hashPassword("luckyguy11"),
      profilePicture:
        "https://imgix.ranker.com/user_node_img/121/2408656/original/wonder-woman-photo-u68?auto=format&q=60&fit=crop&fm=pjpg&dpr=2&crop=faces&h=150&w=150",
    },
    {
      username: "Superman",
      password: await User.hashPassword("luckyguy11"),
      profilePicture:
        "https://imgix.ranker.com/user_node_img/107/2124152/original/superman-comic-book-characters-photo-u28?auto=format&q=60&fit=crop&fm=pjpg&dpr=2&crop=faces&h=150&w=150",
    },
    {
      username: "Nightwing",
      password: await User.hashPassword("luckyguy11"),
      profilePicture:
        "https://imgix.ranker.com/user_node_img/43/854440/original/dick-grayson-comic-book-characters-photo-u19?auto=format&q=60&fit=crop&fm=pjpg&dpr=2&crop=faces&h=150&w=150",
    },
    {
      username: "GreenLantern",
      password: await User.hashPassword("luckyguy11"),
      profilePicture:
        "https://imgix.ranker.com/user_node_img/57/1121987/original/hal-jordan-comic-book-characters-photo-u1?auto=format&q=60&fit=crop&fm=pjpg&dpr=2&crop=faces&h=150&w=150",
    },
    {
      username: "GreenArrow",
      password: await User.hashPassword("luckyguy11"),
      profilePicture:
        "https://imgix.ranker.com/user_node_img/56/1101249/original/green-arrow-u46?auto=format&q=60&fit=crop&fm=pjpg&dpr=2&crop=faces&h=150&w=150",
    },
    {
      username: "RedHood",
      password: await User.hashPassword("luckyguy11"),
      profilePicture:
        "https://imgix.ranker.com/user_node_img/64/1272350/original/jason-todd-comic-book-characters-photo-u1?auto=format&q=60&fit=crop&fm=pjpg&dpr=2&crop=faces&h=150&w=150",
    },
    {
      username: "Robin",
      password: await User.hashPassword("luckyguy11"),
      profilePicture:
        "https://imgix.ranker.com/user_node_img/97/1923725/original/robin-comic-book-series-photo-u1?auto=format&q=60&fit=crop&fm=pjpg&dpr=2&crop=faces&h=150&w=150",
    },
    {
      username: "Shazam",
      password: await User.hashPassword("luckyguy11"),
      profilePicture:
        "https://imgix.ranker.com/user_node_img/34/669610/original/u1?auto=format&q=60&fit=crop&fm=pjpg&dpr=2&crop=faces&h=150&w=150",
    },
    {
      username: "Batgirl",
      password: await User.hashPassword("luckyguy11"),
      profilePicture:
        "https://imgix.ranker.com/node_img/28/540904/original/barbara-gordon-comic-book-characters-photo-1?auto=format&q=60&fit=crop&fm=pjpg&dpr=2&crop=faces&h=150&w=150",
    },
    {
      username: "DoctorFate",
      password: await User.hashPassword("luckyguy11"),
      profilePicture:
        "https://imgix.ranker.com/node_img/44/871198/original/doctor-fate-comic-book-series-photo-1?auto=format&q=60&fit=crop&fm=pjpg&dpr=2&crop=faces&h=150&w=150",
    },
    {
      username: "Cyborg",
      password: await User.hashPassword("luckyguy11"),
      profilePicture:
        "https://imgix.ranker.com/user_node_img/136/2717258/original/cyborg-u25?auto=format&q=60&fit=crop&fm=pjpg&dpr=2&crop=faces&h=150&w=150",
    },
    {
      username: "Aquaman",
      password: await User.hashPassword("luckyguy11"),
      profilePicture:
        "https://imgix.ranker.com/user_node_img/25/482274/original/aquaman-photo-u30?auto=format&q=60&fit=crop&fm=pjpg&dpr=2&crop=faces&h=150&w=150",
    },
    {
      username: "Raven",
      password: await User.hashPassword("luckyguy11"),
      profilePicture:
        "https://imgix.ranker.com/user_node_img/137/2722677/original/raven-photo-u43?auto=format&q=60&fit=crop&fm=pjpg&dpr=2&crop=faces&h=150&w=150",
    },
    {
      username: "JamesGordon",
      password: await User.hashPassword("luckyguy11"),
      profilePicture:
        "https://imgix.ranker.com/node_img/64/1261299/original/james-gordon-comic-book-characters-photo-1?auto=format&q=60&fit=crop&fm=pjpg&dpr=2&crop=faces&h=150&w=150",
    },
    {
      username: "Catwoman",
      password: await User.hashPassword("luckyguy11"),
      profilePicture:
        "https://imgix.ranker.com/user_node_img/35/685950/original/catwoman-comic-book-characters-photo-u19?auto=format&q=60&fit=crop&fm=pjpg&dpr=2&crop=faces&h=150&w=150",
    },
    {
      username: "KidFlash",
      password: await User.hashPassword("luckyguy11"),
      profilePicture:
        "https://imgix.ranker.com/user_node_img/69/1372810/original/kid-flash-comic-book-characters-photo-u1?auto=format&q=60&fit=crop&fm=pjpg&dpr=2&crop=faces&h=150&w=150",
    },
  ];
};

const seedCommunities = [
  {
    contentType: "text,image,video,link",
    rules: [
      {
        rule: "no eating",
        detail:
          "seriously, people arent allowed to eat it leaves crumbs everywhere",
      },
      {
        rule: "no having fun",
        detail:
          "fun is the number one cause of people getting hurt and we dont want that",
      },
      {
        rule: "no games",
        detail:
          "this is a subreddit dedicated to posting funny things, not games and stuffs",
      },
    ],
    profilePicture:
      "https://dictionaryblog.cambridge.org/wp-content/uploads/2019/11/funny.jpg",
    name: "funny",
    description:
      "Welcome to r/funny. This is a place where people can share media they fin hilarious.",
  },
  {
    contentType: "text",
    name: "askreddit",
    profilePicture:
      "https://cdn.theatlantic.com/thumbor/2_pcUPPR-NmuHg3WJYiPEn-9zdg=/0x0:4800x2700/960x540/media/img/mt/2023/01/Dumb_Questions_02/original.jpg",
    rules: [
      {
        rule: "don't hit each other",
        detail: "we dont have time to deal with conflicts ",
      },
      {
        rule: "be yourself",
        detail: "unless youre super wierd, be yourself and chill",
      },
    ],
    description:
      "r/askReddit is a nice community where people ask whatever they want to each other.",
  },
  {
    contentType: "image,link,video",
    name: "awww",
    profilePicture:
      "https://img.freepik.com/premium-vector/cute-bear-with-bubble-tea-cartoon-vector-illustration_42750-816.jpg?w=2000",
    rules: [
      {
        rule: "if i see you being mean",
        detail:
          "like why do people always have to be so mean what did they do to you ???",
      },
      {
        rule: "be chilll bro",
        detail: "its too hot in here for real",
      },
    ],
    description: "Come here if you intend on sharing something super cute.",
  },
  {
    contentType: "image,link,video,text",
    name: "music",
    profilePicture:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Q638_noun_23486_ccIlsurAptukov_music.svg/800px-Q638_noun_23486_ccIlsurAptukov_music.svg.png",
    description: "The musical side of Reddit!",
  },
  {
    contentType: "image",
    name: "pics",
    profilePicture:
      "https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png",
    description: "Do you intend on sharing a jpeg file here ?",
  },
  {
    contentType: "image,link,video",
    name: "science",
    profilePicture:
      "https://www.3ds.com/assets/invest/styles/profile/public/2022-04/glass-molecules-1.jpg.webp?itok=SQu_L9U5",
    description:
      "Science is a systematic endeavor that builds and organizes knowledge in the form of testable explanations and predictions about the universe.",
  },
  {
    contentType: "link",
    name: "worldnews",
    profilePicture:
      "https://storage.googleapis.com/siteassetsswd/198/slideshow/663/20200625074107_56_o_1ba8en13b14c61b15hei1bd63jlc.jpg",
    description: "Anything related news around the world.",
  },
  {
    contentType: "video",
    name: "videos",
    profilePicture:
      "https://learningprofessor.com/wp-content/uploads/2020/03/video.png",
    description: "Do you intend on sharing a mp4 file here ?",
  },
  {
    contentType: "image,link,video",
    name: "todayilearned",
    profilePicture:
      "https://www.clearlypayments.com/wp-content/uploads/2020/07/lean.jpg",
    description:
      "A community where people share info they've just recently learned.",
  },
  {
    contentType: "text",
    name: "jokes",
    profilePicture:
      "https://m.media-amazon.com/images/G/01/seo/siege-lists/best-comedy-audiobooks-social.jpg",
    description: "The main goal here is to make each other laugh.",
  },
];

const seedPosts = [
  {
    title: "this is a video 1",
    type: "video",
    content:
      "https://joy1.videvo.net/videvo_files/video/free/video0455/large_watermarked/_import_609113a1be0e89.39394997_preview.mp4",
  },
  {
    title:
      "this is a video 2 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
    type: "video",
    content: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    title: "this is a picture 1",
    type: "image",
    content:
      "https://edit.co.uk/uploads/2016/12/Image-1-Alternatives-to-stock-photography-Thinkstock.jpg",
  },
  {
    title:
      "this is a picture 2 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
    type: "image",
    content: "https://shotkit.com/wp-content/uploads/2019/02/Stock-photo.jpg",
  },
  {
    title: "this is a demo post link post 1",
    type: "link",
    content:
      "https://photogeeksteven.files.wordpress.com/2014/06/default-user-icon-profile.png",
  },
  {
    title:
      "this is a demo link post 2 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
    type: "link",
    content:
      "https://globalnews.ca/news/9556134/edmonton-police-inglewood-apartment-crime/",
  },
  {
    title: "this is a demo post 1",
    type: "text",
  },
  {
    title: "this is a demo post 2",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    type: "text",
  },
  {
    title: "this is a demo post 3",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    type: "text",
  },
  {
    title: "this is a demo post 4",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    type: "text",
  },
];
const seedComments = [
  {
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do e eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    content:
      "Lorem ipsum dolor sit aate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qu",
  },
  {
    content:
      "Lorem ipsum dolor sit aate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qu",
  },
  {
    content:
      "Lorem ipsum dolor sit aate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qu",
  },
  {
    content:
      "Lorem ipsum dolor sit aate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qu",
  },
  {
    content:
      "Lorem ipsum dolor sit aate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qu",
  },
  {
    content:
      "Lorem ipsum dolor sit aate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qu",
  },
  {
    content:
      "Lorem ipsum dolor sit aate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qu",
  },
];

module.exports = {
  seedCommunities,
  seedPosts,
  seedUsers,
  seedComments,
};
