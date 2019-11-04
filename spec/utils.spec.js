const { expect } = require("chai");
const {
  formatDates,
  makeRefObj,
  formatComments
} = require("../db/utils/utils");

// <------------- FORMAT DATES ------------------->
describe("formatDates", () => {
  // <-- Used as input for single formatDates tests -->
  const input = [
    {
      title: "High Altitude Cooking",
      topic: "cooking",
      author: "happyamy2016",
      body:
        "Most backpacking trails vary only a few thousand feet elevation. However, many trails can be found above 10,000 feet. But what many people don’t take into consideration at these high altitudes is how these elevations affect their cooking.",
      created_at: 1527391948514
    }
  ];

  // <-- Used as test for mutation -->
  const inputCopy = [
    {
      title: "High Altitude Cooking",
      topic: "cooking",
      author: "happyamy2016",
      body:
        "Most backpacking trails vary only a few thousand feet elevation. However, many trails can be found above 10,000 feet. But what many people don’t take into consideration at these high altitudes is how these elevations affect their cooking.",
      created_at: 1527391948514
    }
  ];

  // <-- Used in test for updated outputs -->
  const output = [
    {
      title: "High Altitude Cooking",
      topic: "cooking",
      author: "happyamy2016",
      body:
        "Most backpacking trails vary only a few thousand feet elevation. However, many trails can be found above 10,000 feet. But what many people don’t take into consideration at these high altitudes is how these elevations affect their cooking.",
      created_at: new Date(1527391948514)
    }
  ];

  // <-- Used as input for multi formatDates tests -->
  const inputMulti = [
    {
      title: "High Altitude Cooking",
      topic: "cooking",
      author: "happyamy2016",
      body:
        "Most backpacking trails vary only a few thousand feet elevation. However, many trails can be found above 10,000 feet. But what many people don’t take into consideration at these high altitudes is how these elevations affect their cooking.",
      created_at: 1527391948514
    },
    {
      title: "A BRIEF HISTORY OF FOOD—NO BIG DEAL",
      topic: "cooking",
      author: "tickle122",
      body:
        "n 1686, the croissant was invented in Austria. That's a fun fact I'd probably never had known or maybe don't even really need to know, but now I do, thanks to Julia Rothman's Food Anatomy: The Curious Parts & Pieces of Our Edible World. Rothman has an entire series of illustrated Anatomy books, including Nature and Farm, packed with infographics, quirky facts, and maps that you can get lost in for hours—in a fun way, not in a boring textbook way. It makes you wonder why textbooks aren't this fun to read. Can someone look into this? Thanks.",
      created_at: 1489238418573
    }
  ];

  const outputMulti = [
    {
      title: "High Altitude Cooking",
      topic: "cooking",
      author: "happyamy2016",
      body:
        "Most backpacking trails vary only a few thousand feet elevation. However, many trails can be found above 10,000 feet. But what many people don’t take into consideration at these high altitudes is how these elevations affect their cooking.",
      created_at: new Date(1527391948514)
    },
    {
      title: "A BRIEF HISTORY OF FOOD—NO BIG DEAL",
      topic: "cooking",
      author: "tickle122",
      body:
        "n 1686, the croissant was invented in Austria. That's a fun fact I'd probably never had known or maybe don't even really need to know, but now I do, thanks to Julia Rothman's Food Anatomy: The Curious Parts & Pieces of Our Edible World. Rothman has an entire series of illustrated Anatomy books, including Nature and Farm, packed with infographics, quirky facts, and maps that you can get lost in for hours—in a fun way, not in a boring textbook way. It makes you wonder why textbooks aren't this fun to read. Can someone look into this? Thanks.",
      created_at: new Date(1489238418573)
    }
  ];

  it("returns an array", () => {
    expect(formatDates([])).to.be.an("array");
  });
  it("does not mutate the original data", () => {
    expect(formatDates(input)).to.not.equal(inputCopy);
  });
  it("returns an array of one article, with the date formatted correctly", () => {
    expect(formatDates(input)).to.eql(output);
  });
  it("returns an array of multiple articles, with the dates formatted correctly", () => {
    expect(formatDates(inputMulti)).to.eql(outputMulti);
  });
});

// <------------- Ref Obj ------------------->

describe("makeRefObj", () => {
  const input = [
    {
      article_id: 34,
      title: "The Notorious MSG’s Unlikely Formula For Success",
      topic: "cooking",
      author: "grumpy19",
      body:
        "The 'umami' craze has turned a much-maligned and misunderstood food additive into an object of obsession for the world’s most innovative chefs. But secret ingredient monosodium glutamate’s biggest secret may be that there was never anything wrong with it at all.",
      created_at: new Date(1502921310430)
    }
  ];

  const inputMulti = [
    {
      article_id: 33,
      title: "Seafood substitutions are increasing",
      body:
        "'SEAFOOD fraud is a serious global problem', begins a recent report from Oceana, an NGO. Reviewing over 200 studies in 55 countries, the report finds that one in five fish sold has been mislabelled. Although fish fraud is common early in the supply chain, most of it comes at the retail level. In 65% of cases, the motivation is economic—slippery restaurateurs frequently serve up cheaper fish than they advertise to cut costs. In America, Oceana has reported instances of tilapia being sold as the more expensive red snapper. Especially brazen fish criminals have invented new types of fish entirely. In Brazil, researchers were puzzled to find markets selling 'douradinha', ' non-existent species. Close inspection found that 60% of such fish were actually 'vulture' catfish, a relatively undesirable dish. Reports in America of catfish being substituted for more expensive fish date back to at least 2002; Oceana’s study suggests that the phenomenon is spreading.",
      votes: 0,
      topic: "cooking",
      author: "weegembump",
      created_at: new Date(1527695953341)
    },
    {
      article_id: 34,
      title: "The Notorious MSG’s Unlikely Formula For Success",
      body:
        "The 'umami' craze has turned a much-maligned and misunderstood food additive into an object of obsession for the world’s most innovative chefs. But secret ingredient monosodium glutamate’s biggest secret may be that there was never anything wrong with it at all.",
      votes: 0,
      topic: "cooking",
      author: "grumpy19",
      created_at: new Date(1502921310430)
    }
  ];

  it("returns an array", () => {
    expect(makeRefObj([])).to.be.an("object");
  });
  it("returns a ref obj when passed a single article", () => {
    expect(makeRefObj(input)).to.eql({
      "The Notorious MSG’s Unlikely Formula For Success": 34
    });
  });
  it("returns a ref obj when passed multiple articles", () => {
    expect(makeRefObj(inputMulti)).to.eql({
      "The Notorious MSG’s Unlikely Formula For Success": 34,
      "Seafood substitutions are increasing": 33
    });
  });
});

// <------------- Formatting Comments ------------------->

// <----- Use for single item in an array ----->

const input = [
  {
    body:
      "Itaque quisquam est similique et est perspiciatis reprehenderit voluptatem autem. Voluptatem accusantium eius error adipisci quibusdam doloribus.",
    belongs_to:
      "The People Tracking Every Touch, Pass And Tackle in the World Cup",
    created_by: "tickle122",
    votes: -1,
    created_at: 1468087638932
  }
];

const output = [
  {
    body:
      "Itaque quisquam est similique et est perspiciatis reprehenderit voluptatem autem. Voluptatem accusantium eius error adipisci quibusdam doloribus.",
    votes: -1,
    created_at: new Date(1468087638932),
    author: "tickle122",
    article_id: 18
  }
];

const refObj = {
  "The People Tracking Every Touch, Pass And Tackle in the World Cup": 18
};

// <----- Use for mutation test  ----->

const inputCopy = [
  {
    body:
      "Itaque quisquam est similique et est perspiciatis reprehenderit voluptatem autem. Voluptatem accusantium eius error adipisci quibusdam doloribus.",
    belongs_to:
      "The People Tracking Every Touch, Pass And Tackle in the World Cup",
    created_by: "tickle122",
    votes: -1,
    created_at: 1468087638932
  }
];

// <----- Use for multiple items in an array ----->

const inputMulti = [
  {
    body:
      "Itaque quisquam est similique et est perspiciatis reprehenderit voluptatem autem. Voluptatem accusantium eius error adipisci quibusdam doloribus.",
    belongs_to:
      "The People Tracking Every Touch, Pass And Tackle in the World Cup",
    created_by: "tickle122",
    votes: -1,
    created_at: 1468087638932
  },
  {
    body:
      "Itaque quisquam est similique et est perspiciatis reprehenderit voluptatem autem. Voluptatem accusantium eius error adipisci quibusdam doloribus.",
    belongs_to:
      "The People Tracking Every Touch, Pass And Tackle in the World Cup",
    created_by: "tickle122",
    votes: -1,
    created_at: 1468087638932
  }
];

const outputMulti = [
  {
    body:
      "Itaque quisquam est similique et est perspiciatis reprehenderit voluptatem autem. Voluptatem accusantium eius error adipisci quibusdam doloribus.",
    votes: -1,
    created_at: new Date(1468087638932),
    author: "tickle122",
    article_id: 18
  },
  {
    body:
      "Itaque quisquam est similique et est perspiciatis reprehenderit voluptatem autem. Voluptatem accusantium eius error adipisci quibusdam doloribus.",
    votes: -1,
    created_at: new Date(1468087638932),
    author: "tickle122",
    article_id: 18
  }
];

const refObjMulti = {
  "The People Tracking Every Touch, Pass And Tackle in the World Cup": 18
};

describe("formatComments", () => {
  it("returns an array", () => {
    expect(formatComments([])).to.be.an("array");
  });
  it("does not mutate the original data", () => {
    expect(formatComments(input, refObj)).to.not.equal(inputCopy);
  });
  it("returns an array with one updated comment", () => {
    expect(formatComments(input, refObj)).to.eql(output);
  });
  it("does not mutate the original input", () => {
    expect(formatComments(inputMulti, refObjMulti)).to.eql(outputMulti);
  });
});
