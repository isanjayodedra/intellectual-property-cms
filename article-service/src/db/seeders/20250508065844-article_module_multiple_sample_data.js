'use strict';

const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const now = new Date();

    // 10 articles with varied statuses and metadata
    const articles = [
      {
        slug: 'tech-trends-2025',
        status: 'published',
        scheduled_at: now,
        published_at: now,
        author_id: 1,
        secret_key: uuidv4(),
        must_be_logged_in: false,
        must_be_verified: false,
        must_be_over_18: false,
        geo_block_mode: null,
        geo_block_countries: null,
        metadata: JSON.stringify({ topic: 'Technology' }),
        deleted_at: null,
        created_at: now,
        updated_at: now,
      },
      {
        slug: 'health-and-wellness',
        status: 'draft',
        scheduled_at: null,
        published_at: null,
        author_id: 2,
        secret_key: uuidv4(),
        must_be_logged_in: false,
        must_be_verified: false,
        must_be_over_18: false,
        geo_block_mode: null,
        geo_block_countries: null,
        metadata: JSON.stringify({ topic: 'Health' }),
        deleted_at: null,
        created_at: now,
        updated_at: now,
      },
      {
        slug: 'global-economy-outlook',
        status: 'scheduled',
        scheduled_at: new Date(now.getTime() + 2 * 86400000),
        published_at: null,
        author_id: 3,
        secret_key: uuidv4(),
        must_be_logged_in: true,
        must_be_verified: false,
        must_be_over_18: false,
        geo_block_mode: 'allow',
        geo_block_countries: JSON.stringify(['IN', 'US']),
        metadata: JSON.stringify({ topic: 'Economy' }),
        deleted_at: null,
        created_at: now,
        updated_at: now,
      },
      {
        slug: 'travel-guide-asia',
        status: 'published',
        scheduled_at: now,
        published_at: now,
        author_id: 4,
        secret_key: uuidv4(),
        must_be_logged_in: false,
        must_be_verified: false,
        must_be_over_18: false,
        geo_block_mode: null,
        geo_block_countries: null,
        metadata: JSON.stringify({ topic: 'Travel' }),
        deleted_at: null,
        created_at: now,
        updated_at: now,
      },
      {
        slug: 'cooking-basics',
        status: 'published',
        scheduled_at: now,
        published_at: now,
        author_id: 1,
        secret_key: uuidv4(),
        must_be_logged_in: false,
        must_be_verified: true,
        must_be_over_18: false,
        geo_block_mode: null,
        geo_block_countries: null,
        metadata: JSON.stringify({ topic: 'Cooking' }),
        deleted_at: null,
        created_at: now,
        updated_at: now,
      },
      {
        slug: 'artificial-intelligence',
        status: 'draft',
        scheduled_at: null,
        published_at: null,
        author_id: 2,
        secret_key: uuidv4(),
        must_be_logged_in: true,
        must_be_verified: true,
        must_be_over_18: false,
        geo_block_mode: null,
        geo_block_countries: null,
        metadata: JSON.stringify({ topic: 'AI' }),
        deleted_at: null,
        created_at: now,
        updated_at: now,
      },
      {
        slug: 'fitness-routines',
        status: 'scheduled',
        scheduled_at: new Date(now.getTime() + 5 * 86400000),
        published_at: null,
        author_id: 3,
        secret_key: uuidv4(),
        must_be_logged_in: false,
        must_be_verified: false,
        must_be_over_18: false,
        geo_block_mode: 'deny',
        geo_block_countries: JSON.stringify(['CN', 'RU']),
        metadata: JSON.stringify({ topic: 'Fitness' }),
        deleted_at: null,
        created_at: now,
        updated_at: now,
      },
      {
        slug: 'financial-planning',
        status: 'published',
        scheduled_at: now,
        published_at: now,
        author_id: 4,
        secret_key: uuidv4(),
        must_be_logged_in: false,
        must_be_verified: false,
        must_be_over_18: true,
        geo_block_mode: null,
        geo_block_countries: null,
        metadata: JSON.stringify({ topic: 'Finance' }),
        deleted_at: null,
        created_at: now,
        updated_at: now,
      },
      {
        slug: 'art-and-culture',
        status: 'published',
        scheduled_at: now,
        published_at: now,
        author_id: 1,
        secret_key: uuidv4(),
        must_be_logged_in: false,
        must_be_verified: false,
        must_be_over_18: false,
        geo_block_mode: null,
        geo_block_countries: null,
        metadata: JSON.stringify({ topic: 'Culture' }),
        deleted_at: null,
        created_at: now,
        updated_at: now,
      },
      {
        slug: 'education-reform',
        status: 'draft',
        scheduled_at: null,
        published_at: null,
        author_id: 2,
        secret_key: uuidv4(),
        must_be_logged_in: true,
        must_be_verified: false,
        must_be_over_18: false,
        geo_block_mode: null,
        geo_block_countries: null,
        metadata: JSON.stringify({ topic: 'Education' }),
        deleted_at: null,
        created_at: now,
        updated_at: now,
      },
    ];
    await queryInterface.bulkInsert('articles', articles, {});

    // New article IDs will be 2..11 (1 exists)
    const articleIds = [2,3,4,5,6,7,8,9,10,11];

    // Translations with real titles & descriptions
    const translations = [];
    const titles = {
      2: ['Tech Trends 2025', '2025 के तकनीकी रुझान'],
      3: ['Health & Wellness', 'स्वास्थ्य और कल्याण'],
      4: ['Global Economy Outlook', 'वैश्विक अर्थव्यवस्था का आउटलुक'],
      5: ['Travel Guide Asia',     'एशिया यात्रा गाइड'],
      6: ['Cooking Basics',         'खाना पकाने के मूल बातें'],
      7: ['Artificial Intelligence','कृत्रिम बुद्धिमत्ता'],
      8: ['Fitness Routines',       'व्यायाम दिनचर्या'],
      9: ['Financial Planning',     'वित्तीय योजना'],
      10:['Art & Culture',          'कला और संस्कृति'],
      11:['Education Reform',       'शिक्षा सुधार'],
    };
    articleIds.forEach(id => {
      const [enTitle, hiTitle] = titles[id];
      translations.push(
        {
          article_id: id,
          language_code: 'en',
          title: enTitle,
          description: `An in-depth look at ${enTitle.toLowerCase()}.`, 
          locale: 'en-US', sponsor_name: null, sponsor_logo_url: null, sponsor_url: null,
          deleted_at: null, created_at: now, updated_at: now,
        },
        {
          article_id: id,
          language_code: 'hi',
          title: hiTitle,
          description: `${hiTitle} पर गहन दृष्टिकोण।`, 
          locale: 'hi-IN', sponsor_name: null, sponsor_logo_url: null, sponsor_url: null,
          deleted_at: null, created_at: now, updated_at: now,
        }
      );
    });
    await queryInterface.bulkInsert('article_translations', translations, {});

    // Blocks: random selection of 6 blocks from 1..17 per article
    const allBlockIds = Array.from({ length: 17 }, (_, i) => i + 1);
    const articleBlocks = [];
    articleIds.forEach(id => {
      const selection = allBlockIds.sort(() => 0.5 - Math.random()).slice(0, 6);
      selection.forEach(blockId => {
        const type = `type${blockId}`;
        articleBlocks.push(
          {
            article_id: id,
            block_id: blockId,
            language_code: 'en',
            title: `Block ${blockId} EN for article ${id}`,
            block_type: type,
            content: JSON.stringify({ message: `Sample content EN for block ${blockId}` }),
            sort_order: blockId,
            created_by: 1,
            updated_by: 1,
            version: 1,
            deleted_at: null,
            created_at: now,
            updated_at: now,
          },
          {
            article_id: id,
            block_id: blockId,
            language_code: 'hi',
            title: `ब्लॉक ${blockId} HI लेख ${id}`,
            block_type: type,
            content: JSON.stringify({ message: `ब्लॉक ${blockId} के लिए HI सामग्री` }),
            sort_order: blockId,
            created_by: 1,
            updated_by: 1,
            version: 1,
            deleted_at: null,
            created_at: now,
            updated_at: now,
          }
        );
      });
    });
    await queryInterface.bulkInsert('article_blocks', articleBlocks, {});

    // Categories: assign round-robin between 1 and 2
    const articleCategories = articleIds.map((id, idx) => ({
      article_id: id,
      category_id: (idx % 2) + 1,
      created_at: now,
      updated_at: now,
    }));
    await queryInterface.bulkInsert('article_categories', articleCategories, {});

    // Tags: assign round-robin between 1 and 2
    const articleTags = articleIds.map((id, idx) => ({
      article_id: id,
      tag_id: (idx % 2) + 1,
      created_at: now,
      updated_at: now,
    }));
    await queryInterface.bulkInsert('article_tags', articleTags, {});
  },

  down: async (queryInterface, Sequelize) => {
    const slugs = [
      'tech-trends-2025','health-and-wellness','global-economy-outlook',
      'travel-guide-asia','cooking-basics','artificial-intelligence',
      'fitness-routines','financial-planning','art-and-culture','education-reform'
    ];
    await queryInterface.bulkDelete('article_tags',        null, {});
    await queryInterface.bulkDelete('article_categories',  null, {});
    await queryInterface.bulkDelete('article_blocks',      null, {});
    await queryInterface.bulkDelete('article_translations',null, {});
    await queryInterface.bulkDelete('articles', { slug: slugs }, {});
  },
};
