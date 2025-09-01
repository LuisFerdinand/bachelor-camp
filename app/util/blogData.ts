
// app/util/blogData.ts
export interface BlogPost {
  id: number
  slug: string
  title: string
  excerpt: string
  content: string
  author: string
  date: string
  readTime: string
  category: string
  image: string
  imageAlt: string
  tags: string[]
  relatedPosts: {
    id: number
    title: string
    slug: string
    image: string
    imageAlt: string
    category: string
    date: string
  }[]
  // Add table of contents property
  tableOfContents?: {
    id: string
    title: string
    level: number
  }[]
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    slug: "effective-strategies-for-learning-english-vocabulary",
    title: "5 Effective Strategies for Learning English Vocabulary",
    excerpt: "Discover proven techniques to expand your English vocabulary quickly and retain new words longer.",
    content: `
      <p>Learning vocabulary is a fundamental part of mastering any language, and English is no exception. However, many learners struggle with memorizing new words and retaining them long-term. In this article, we'll explore five effective strategies that can help you expand your English vocabulary more efficiently.</p>
      
      <h3>1. Use Spaced Repetition Systems (SRS)</h3>
      <p>Spaced repetition is a learning technique that incorporates increasing intervals of time between subsequent review of previously learned material. This approach is based on the psychological spacing effect, which demonstrates that information is more easily recalled when learning is spread out over time.</p>
      <p>Popular SRS tools like Anki, Quizlet, or Memrise can help you implement this technique effectively. These apps automatically schedule reviews based on how well you remember each word, ensuring you review difficult words more frequently and easier words less often.</p>
      
      <h3>2. Learn Words in Context</h3>
      <p>Instead of memorizing isolated word lists, try to learn new vocabulary in context. This means seeing and using words in sentences, paragraphs, or even entire texts. When you encounter a new word in context, you're more likely to remember it because you understand how it's used.</p>
      <p>Reading extensively in English is one of the best ways to learn vocabulary in context. Choose materials that interest you, whether it's novels, news articles, or blog posts. When you come across unfamiliar words, try to guess their meaning from the context before looking them up.</p>
      
      <h3>3. Create Personal Connections</h3>
      <p>Our brains are wired to remember information that has personal relevance. When learning a new word, try to create a personal connection or mental image associated with it. The more vivid and personal the connection, the better you'll remember the word.</p>
      <p>For example, if you're learning the word "serene" (meaning calm and peaceful), you might imagine yourself sitting by a calm lake on a peaceful morning. This personal mental image will help anchor the word in your memory.</p>
      
      <h3>4. Practice Active Recall</h3>
      <p>Active recall is the practice of actively stimulating memory during the learning process. Instead of passively reviewing information, try to retrieve it from memory. This strengthens the neural pathways associated with that information, making it easier to recall in the future.</p>
      <p>Flashcards are a simple but effective tool for active recall. Instead of just reading the word and its definition, try to recall the definition before flipping the card. You can also practice by writing sentences using new words or explaining concepts in your own words.</p>
      
      <h3>5. Use New Words Immediately</h3>
      <p>The best way to solidify new vocabulary in your memory is to use it as soon as possible. Try to incorporate new words into your speaking and writing. This could be as simple as using a new word in a conversation with a language partner or writing a short paragraph using several new words you've learned.</p>
      <p>Using words in context helps reinforce their meaning and usage, making them more likely to stick in your long-term memory. Plus, it gives you valuable practice with sentence structure and word forms.</p>
      
      <h3>Conclusion</h3>
      <p>Building a strong English vocabulary takes time and consistent effort, but by using these strategies, you can make the process more efficient and effective. Remember that everyone learns differently, so experiment with these techniques to find what works best for you. With patience and persistence, you'll see your vocabulary grow steadily over time.</p>
    `,
    author: "Sarah Johnson",
    date: "May 15, 2023",
    readTime: "5 min read",
    category: "Learning Tips",
    image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    imageAlt: "Person studying vocabulary with flashcards",
    tags: ["Vocabulary", "Learning Strategies", "Memory Techniques"],
    relatedPosts: [
      {
        id: 2,
        title: "IELTS Speaking Test: Common Mistakes to Avoid",
        slug: "ielts-speaking-test-common-mistakes",
        image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
        imageAlt: "Person taking IELTS test",
        category: "IELTS Preparation",
        date: "April 28, 2023"
      },
      {
        id: 5,
        title: "Understanding CEFR Levels: A Complete Guide",
        slug: "understanding-cefr-levels",
        image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
        imageAlt: "CEFR language levels chart",
        category: "CEFR",
        date: "March 5, 2023"
      },
      {
        id: 3,
        title: "The Benefits of Immersion Learning",
        slug: "benefits-of-immersion-learning",
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
        imageAlt: "Students in immersion learning environment",
        category: "Learning Methods",
        date: "April 10, 2023"
      }
    ]
  },
  {
    id: 2,
    slug: "ielts-speaking-test-common-mistakes",
    title: "IELTS Speaking Test: Common Mistakes to Avoid",
    excerpt: "Learn about the most frequent errors candidates make in the IELTS speaking test and how to avoid them.",
    content: `
      <p>The IELTS Speaking test can be challenging for many candidates, even those with strong English skills. Understanding the common mistakes that test-takers make can help you avoid them and achieve a higher band score. In this article, we'll explore the most frequent errors in the IELTS Speaking test and provide strategies to overcome them.</p>
      
      <h3>1. Giving Short Answers</h3>
      <p>One of the most common mistakes in the IELTS Speaking test is giving very short answers, especially in Part 1. While it's important to be concise, answers that are too brief don't allow you to demonstrate your language abilities fully.</p>
      <p><strong>Example:</strong></p>
      <p><em>Examiner: "Do you like reading books?"</em></p>
      <p><em>Candidate: "Yes, I do."</em> (Too short)</p>
      <p><em>Better answer: "Yes, I really enjoy reading, especially fiction novels. I find it's a great way to relax and escape into different worlds. I usually try to read at least one book a month."</em></p>
      <p>Try to extend your answers by providing reasons, examples, or additional details related to the question.</p>
      
      <h3>2. Memorizing Answers</h3>
      <p>Some candidates try to memorize answers for common questions, but this often backfires. Examiners are trained to detect memorized responses, and they can sound unnatural and don't demonstrate your ability to communicate spontaneously.</p>
      <p>Instead of memorizing, prepare ideas and vocabulary for common topics, but be ready to adapt your responses to the specific questions asked. Practice speaking naturally about a variety of topics to build fluency.</p>
      
      <h3>3. Using Fillers Excessively</h3>
      <p>While it's natural to use fillers like "um," "uh," and "you know" occasionally in speech, using them excessively can negatively impact your fluency score. These fillers can make your speech sound hesitant and disjointed.</p>
      <p>Practice speaking without relying on these fillers. If you need a moment to think, it's better to pause briefly than to fill the silence with unnecessary words. Recording yourself speaking can help you identify and reduce your use of fillers.</p>
      
      <h3>4. Pronunciation Issues</h3>
      <p>Pronunciation is a key component of the IELTS Speaking test, and many candidates lose points due to unclear pronunciation. This doesn't mean you need a perfect accent, but your speech should be clear and understandable.</p>
      <p>Pay attention to word stress, sentence stress, and intonation. Listening to native speakers and imitating their pronunciation can be helpful. Focus on sounds that are difficult in your native language and practice them regularly.</p>
      
      <h3>5. Limited Vocabulary</h3>
      <p>Using the same simple words repeatedly can limit your vocabulary score. The IELTS examiners want to see that you can use a range of vocabulary appropriately.</p>
      <p>Expand your vocabulary by learning synonyms and practicing using them in context. For example, instead of always saying "good," try using "excellent," "fantastic," "beneficial," or "advantageous" when appropriate.</p>
      
      <h3>Conclusion</h3>
      <p>Avoiding these common mistakes can significantly improve your performance in the IELTS Speaking test. Remember to practice regularly, record yourself to identify areas for improvement, and focus on communicating naturally and effectively. With preparation and awareness, you can achieve the band score you're aiming for.</p>
    `,
    author: "Michael Chen",
    date: "April 28, 2023",
    readTime: "7 min read",
    category: "IELTS Preparation",
    image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Student taking IELTS speaking test",
    tags: ["IELTS", "Speaking", "Test Preparation", "Common Mistakes"],
    relatedPosts: [
      {
        id: 1,
        title: "5 Effective Strategies for Learning English Vocabulary",
        slug: "effective-strategies-for-learning-english-vocabulary",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
        imageAlt: "Person studying vocabulary",
        category: "Learning Tips",
        date: "May 15, 2023"
      },
      {
        id: 4,
        title: "Business English: Email Writing Essentials",
        slug: "business-english-email-writing",
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
        imageAlt: "Business email writing",
        category: "Business English",
        date: "March 22, 2023"
      },
      {
        id: 6,
        title: "Pronunciation Tips for Non-Native Speakers",
        slug: "pronunciation-tips-non-native-speakers",
        image: "https://images.unsplash.com/photo-1533281584759-31329ab1727d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
        imageAlt: "English pronunciation practice",
        category: "Pronunciation",
        date: "February 18, 2023"
      }
    ]
  },
  {
    id: 3,
    slug: "benefits-of-immersion-learning",
    title: "The Benefits of Immersion Learning",
    excerpt: "Explore how immersion learning can accelerate your English language acquisition and cultural understanding.",
    content: `
      <p>Immersion learning is a powerful approach to language acquisition that involves surrounding yourself with the target language in various contexts. This method goes beyond traditional classroom instruction by creating an environment where English is not just a subject to study, but a living tool for communication and cultural exchange.</p>
      
      <h3>What is Immersion Learning?</h3>
      <p>Immersion learning is a method of language education where learners are surrounded by the target language in authentic contexts. Instead of treating English as a subject to be studied, immersion treats it as a medium for learning and communication. This approach mimics the natural way we acquire our first language—through constant exposure and meaningful interaction.</p>
      
      <h3>Accelerated Language Acquisition</h3>
      <p>One of the most significant benefits of immersion learning is the acceleration of language acquisition. When you're constantly exposed to English in various contexts, your brain begins to process the language more naturally. This constant exposure helps develop intuitive understanding of grammar, vocabulary, and pronunciation patterns.</p>
      <p>Research shows that immersion learners often achieve functional fluency faster than those in traditional classroom settings. This is because immersion engages multiple learning pathways—visual, auditory, and kinesthetic—creating stronger neural connections.</p>
      
      <h3>Cultural Understanding</h3>
      <p>Language and culture are inseparable. Immersion learning provides authentic cultural experiences that help learners understand the nuances of English communication. Through interactions with native speakers and participation in cultural activities, learners gain insights into social norms, idiomatic expressions, and cultural references that are difficult to teach in a traditional classroom.</p>
      <p>This cultural competence is invaluable for effective communication. It helps learners understand not just what words mean, but how and when to use them appropriately in different social contexts.</p>
      
      <h3>Improved Pronunciation and Accent</h3>
      <p>Regular exposure to native speakers in authentic contexts significantly improves pronunciation and accent reduction. When learners hear English spoken naturally and have opportunities to mimic native speakers, they develop more authentic pronunciation patterns.</p>
      <p>Immersion also helps learners understand the rhythm, intonation, and stress patterns of English, which are crucial for clear and natural-sounding speech.</p>
      
      <h3>Increased Confidence</h3>
      <p>Many language learners struggle with confidence when speaking English. Immersion learning addresses this by providing constant opportunities to use the language in real situations. As learners successfully communicate in English, their confidence grows, creating a positive feedback loop that encourages further practice and improvement.</p>
      
      <h3>Practical Application of Skills</h3>
      <p>Unlike traditional classroom learning where knowledge often remains theoretical, immersion learning emphasizes practical application. Learners use English to accomplish real tasks—shopping, asking for directions, making friends, or participating in activities. This practical application reinforces learning and makes it more meaningful and memorable.</p>
      
      <h3>How to Create an Immersion Environment</h3>
      <p>You don't necessarily need to travel to an English-speaking country to benefit from immersion learning. Here are some ways to create an immersion environment:</p>
      <ul>
        <li><strong>Media Immersion:</strong> Watch English movies, TV shows, and YouTube channels without subtitles. Listen to English music and podcasts.</li>
        <li><strong>Social Immersion:</strong> Join English conversation groups, find language exchange partners, or participate in online English communities.</li>
        <li><strong>Daily Routine:</strong> Change your phone and computer language settings to English. Think in English throughout the day.</li>
        <li><strong>Hobbies:</strong> Pursue hobbies in English—cooking, gaming, reading, or sports—using English resources.</li>
      </ul>
      
      <h3>Conclusion</h3>
      <p>Immersion learning offers a holistic approach to language acquisition that goes beyond memorization and grammar rules. By surrounding yourself with English in authentic contexts, you can accelerate your learning, develop cultural understanding, improve pronunciation, build confidence, and apply your skills in practical ways. Whether through travel or creating an immersion environment at home, this approach can transform your English learning journey.</p>
    `,
    author: "Emma Rodriguez",
    date: "April 10, 2023",
    readTime: "8 min read",
    category: "Learning Methods",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Students in immersion learning environment",
    tags: ["Immersion", "Learning Methods", "Cultural Understanding"],
    relatedPosts: [
      {
        id: 1,
        title: "5 Effective Strategies for Learning English Vocabulary",
        slug: "effective-strategies-for-learning-english-vocabulary",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
        imageAlt: "Person studying vocabulary",
        category: "Learning Tips",
        date: "May 15, 2023"
      },
      {
        id: 2,
        title: "IELTS Speaking Test: Common Mistakes to Avoid",
        slug: "ielts-speaking-test-common-mistakes",
        image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
        imageAlt: "Person taking IELTS test",
        category: "IELTS Preparation",
        date: "April 28, 2023"
      },
      {
        id: 5,
        title: "Understanding CEFR Levels: A Complete Guide",
        slug: "understanding-cefr-levels",
        image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
        imageAlt: "CEFR language levels chart",
        category: "CEFR",
        date: "March 5, 2023"
      }
    ]
  },
  {
    id: 4,
    slug: "business-english-email-writing",
    title: "Business English: Email Writing Essentials",
    excerpt: "Master the art of professional email communication with these essential tips and templates.",
    content: `
      <p>In today's global business environment, effective email communication is a critical skill. Business emails serve as a primary mode of professional communication, and mastering this form of writing can significantly impact your career success. This comprehensive guide will help you develop the skills needed to write clear, professional, and effective business emails.</p>
      
      <h3>The Importance of Business Email Writing</h3>
      <p>Business emails are often the first impression you make on colleagues, clients, and potential employers. A well-crafted email demonstrates professionalism, attention to detail, and respect for the recipient's time. Poorly written emails, on the other hand, can lead to misunderstandings, damaged relationships, and missed opportunities.</p>
      
      <h3>Key Components of a Business Email</h3>
      <p>A professional business email typically includes several key components:</p>
      
      <h4>1. Subject Line</h4>
      <p>The subject line should be clear, concise, and informative. It should accurately summarize the content of the email and help the recipient prioritize their inbox. Avoid vague subjects like "Hello" or "Update." Instead, be specific: "Project Timeline Update - Q3 Marketing Campaign" or "Meeting Request: Budget Review for 2023."</p>
      
      <h4>2. Greeting</h4>
      <p>The greeting sets the tone for your email. Use formal greetings like "Dear Dr. Smith," "Dear Ms. Johnson," or "Dear Hiring Manager," unless you have an established casual relationship with the recipient. When in doubt, err on the side of formality.</p>
      
      <h4>3. Opening</h4>
      <p>The opening should clearly state the purpose of your email. Be direct and concise. For example: "I am writing to inquire about the status of my application" or "I would like to schedule a meeting to discuss the upcoming project."</p>
      
      <h4>4. Body</h4>
      <p>The body contains the main message of your email. Keep paragraphs short and focused. Use bullet points for lists to improve readability. Be professional, polite, and clear in your communication. Avoid jargon unless you're certain the recipient will understand it.</p>
      
      <h4>5. Closing</h4>
      <p>The closing should include a call to action or next steps. For example: "I look forward to hearing from you" or "Please let me know if you need additional information."</p>
      
      <h4>6. Signature</h4>
      <p>Your signature should include your full name, title, company, and contact information. This makes it easy for the recipient to respond or contact you through other channels if needed.</p>
      
      <h3>Tone and Language</h3>
      <p>Business emails should maintain a professional tone throughout. Here are some guidelines:</p>
      <ul>
        <li><strong>Be Formal:</strong> Use formal language and avoid slang, contractions, and overly casual expressions.</li>
        <li><strong>Be Polite:</strong> Use phrases like "please," "thank you," and "I appreciate your time."</li>
        <li><strong>Be Clear:</strong> Avoid ambiguity and be direct about your purpose and expectations.</li>
        <li><strong>Be Concise:</strong> Respect the recipient's time by getting to the point quickly.</li>
      </ul>
      
      <h3>Common Business Email Templates</h3>
      
      <h4>Inquiry Email</h4>
      <p><em>Subject: Inquiry About Marketing Services</em></p>
      <p><em>Dear Ms. Thompson,</em></p>
      <p><em>I am writing to inquire about the marketing services your company offers. I am particularly interested in digital marketing solutions for small businesses.</em></p>
      <p><em>Could you please provide information about your packages and pricing? I would also appreciate it if you could share some case studies or examples of successful campaigns you've managed.</em></p>
      <p><em>Thank you for your time and assistance. I look forward to hearing from you soon.</em></p>
      <p><em>Sincerely,<br>
      John Davis<br>
      Marketing Director<br>
      ABC Company<br>
      john.davis@abccompany.com</em></p>
      
      <h4>Meeting Request</h4>
      <p><em>Subject: Meeting Request: Project Planning</em></p>
      <p><em>Dear Team,</em></p>
      <p><em>I would like to schedule a meeting to plan the upcoming product launch project. The meeting will cover timelines, responsibilities, and resource allocation.</em></p>
      <p><em>Please let me know your availability next week. I propose Tuesday or Wednesday afternoon, but I'm flexible if those times don't work for everyone.</em></p>
      <p><em>I look forward to your response.</em></p>
      <p><em>Best regards,<br>
      Sarah Johnson<br>
      Project Manager<br>
      XYZ Corporation</em></p>
      
      <h4>Follow-Up Email</h4>
      <p><em>Subject: Follow-Up: Job Application for Marketing Manager Position</em></p>
      <p><em>Dear Mr. Anderson,</em></p>
      <p><em>I hope this email finds you well. I am writing to follow up on my application for the Marketing Manager position at your company, which I submitted on June 1st.</em></p>
      <p><em>I am very interested in this opportunity and believe my experience in digital marketing and team leadership would make me a valuable addition to your organization. I would appreciate any updates you can provide regarding the hiring timeline.</em></p>
      <p><em>Thank you for your consideration. I look forward to hearing from you.</em></p>
      <p><em>Sincerely,<br>
      Michael Chen<br>
      michael.chen@email.com<br>
      (555) 123-4567</em></p>
      
      <h3>Common Mistakes to Avoid</h3>
      <ul>
        <li><strong>Vague Subject Lines:</strong> Be specific about the email's content.</li>
        <li><strong>Overly Casual Tone:</strong> Maintain professionalism in all business communications.</li>
        <li><strong>Lengthy Paragraphs:</strong> Break up text for better readability.</li>
        <li><strong>Spelling and Grammar Errors:</strong> Proofread carefully before sending.</li>
        <li><strong>Lack of Clear Call to Action:</strong> Be clear about what you expect from the recipient.</li>
        <li><strong>Forgetting Attachments:</strong> Double-check that you've included all necessary files.</li>
      </ul>
      
      <h3>Conclusion</h3>
      <p>Mastering business email writing is an essential skill in today's professional world. By following these guidelines and using the templates provided, you can communicate effectively, professionally, and confidently in any business context. Remember to proofread carefully, maintain a professional tone, and be clear about your purpose and expectations. With practice, you'll become adept at crafting emails that get results and build positive professional relationships.</p>
    `,
    author: "David Kim",
    date: "March 22, 2023",
    readTime: "10 min read",
    category: "Business English",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Business professional writing email on laptop",
    tags: ["Business English", "Email Writing", "Professional Communication"],
    relatedPosts: [
      {
        id: 2,
        title: "IELTS Speaking Test: Common Mistakes to Avoid",
        slug: "ielts-speaking-test-common-mistakes",
        image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
        imageAlt: "Person taking IELTS test",
        category: "IELTS Preparation",
        date: "April 28, 2023"
      },
      {
        id: 1,
        title: "5 Effective Strategies for Learning English Vocabulary",
        slug: "effective-strategies-for-learning-english-vocabulary",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
        imageAlt: "Person studying vocabulary",
        category: "Learning Tips",
        date: "May 15, 2023"
      },
      {
        id: 6,
        title: "Pronunciation Tips for Non-Native Speakers",
        slug: "pronunciation-tips-non-native-speakers",
        image: "https://images.unsplash.com/photo-1533281584759-31329ab1727d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
        imageAlt: "English pronunciation practice",
        category: "Pronunciation",
        date: "February 18, 2023"
      }
    ]
  },
  {
    id: 5,
    slug: "understanding-cefr-levels",
    title: "Understanding CEFR Levels: A Complete Guide",
    excerpt: "Everything you need to know about the Common European Framework of Reference for Languages.",
    content: `
      <p>The Common European Framework of Reference for Languages, commonly known as CEFR, is an international standard for describing language ability. It was developed by the Council of Europe to provide a comprehensive method of teaching, learning, and assessing that applies to all languages in Europe. Today, it's used worldwide to describe learners' language proficiency.</p>
      
      <h3>What is CEFR?</h3>
      <p>CEFR provides a scale of language proficiency that is divided into three broad levels, which are further subdivided into six levels. These levels describe what a learner can do in reading, listening, speaking, and writing at each stage of their language learning journey. The framework focuses on communication as the primary goal of language learning and emphasizes practical language use rather than theoretical knowledge.</p>
      
      <h3>The Six CEFR Levels</h3>
      
      <h4>A1: Beginner</h4>
      <p>At the A1 level, learners can:</p>
      <ul>
        <li>Understand and use familiar everyday expressions and very basic phrases</li>
        <li>Introduce themselves and others</li>
        <li>Ask and answer basic personal questions</li>
        <li>Interact in a simple way if the other person speaks slowly and clearly</li>
      </ul>
      <p>This level is equivalent to 80-100 hours of English study for most learners.</p>
      
      <h4>A2: Elementary</h4>
      <p>At the A2 level, learners can:</p>
      <ul>
        <li>Understand sentences and frequently used expressions</li>
        <li>Communicate in simple and routine tasks</li>
        <li>Describe in simple terms aspects of their background, immediate environment, and needs</li>
      </ul>
      <p>This level typically requires 180-200 hours of study.</p>
      
      <h4>B1: Intermediate</h4>
      <p>At the B1 level, learners can:</p>
      <ul>
        <li>Understand the main points of clear standard input on familiar matters</li>
        <li>Deal with most situations likely to arise while traveling</li>
        <li>Produce simple connected text on topics that are familiar or of personal interest</li>
        <li>Describe experiences, events, dreams, hopes, and ambitions</li>
      </ul>
      <p>This level usually requires 350-400 hours of study.</p>
      
      <h4>B2: Upper Intermediate</h4>
      <p>At the B2 level, learners can:</p>
      <ul>
        <li>Understand the main ideas of complex text on both concrete and abstract topics</li>
        <li>Interact with a degree of fluency and spontaneity that makes regular interaction with native speakers quite possible</li>
        <li>Produce clear, detailed text on a wide range of subjects</li>
        <li>Explain a viewpoint on a topical issue, giving the advantages and disadvantages</li>
      </ul>
      <p>This level typically requires 500-600 hours of study.</p>
      
      <h4>C1: Advanced</h4>
      <p>At the C1 level, learners can:</p>
      <ul>
        <li>Understand a wide range of demanding, longer texts, and recognize implicit meaning</li>
        <li>Express ideas fluently and spontaneously without much obvious searching for expressions</li>
        <li>Use language flexibly and effectively for social, academic, and professional purposes</li>
        <li>Produce clear, well-structured, detailed text on complex subjects</li>
      </ul>
      <p>This level usually requires 700-800 hours of study.</p>
      
      <h4>C2: Proficiency</h4>
      <p>At the C2 level, learners can:</p>
      <ul>
        <li>Understand with ease virtually everything heard or read</li>
        <li>Summarize information from different spoken and written sources</li>
        <li>Reconstruct arguments and accounts in a coherent presentation</li>
        <li>Express themselves spontaneously, very fluently, and precisely</li>
        <li>Differentiate finer shades of meaning even in the most complex situations</li>
      </ul>
      <p>This level typically requires 1,000+ hours of study.</p>
      
      <h3>Why CEFR Matters</h3>
      <p>CEFR provides several important benefits for language learners, teachers, and institutions:</p>
      
      <h4>For Learners</h4>
      <ul>
        <li><strong>Clear Learning Path:</strong> CEFR provides a clear roadmap of what to learn at each stage.</li>
        <li><strong>Self-Assessment:</strong> Learners can assess their own progress and set realistic goals.</li>
        <li><strong>International Recognition:</strong> CEFR levels are recognized worldwide, making it easier to communicate language ability across borders.</li>
      </ul>
      
      <h4>For Teachers and Institutions</h4>
      <ul>
        <li><strong>Curriculum Development:</strong> CEFR provides a framework for developing curriculum and courses.</li>
        <li><strong>Assessment:</strong> It offers standards for evaluating language proficiency.</li>
        <li><strong>Consistency:</strong> It ensures consistency in teaching and assessment across different institutions.</li>
      </ul>
      
      <h3>CEFR and Language Exams</h3>
      <p>Many standardized English exams align with CEFR levels:</p>
      <ul>
        <li><strong>IELTS:</strong> Band 4-5 (B1), Band 5.5-6.5 (B2), Band 7-8 (C1), Band 8.5-9 (C2)</li>
        <li><strong>TOEFL iBT:</strong> 42-71 (B1), 72-94 (B2), 95-110 (C1), 111-120 (C2)</li>
        <li><strong>Cambridge English:</strong> KET (A2), PET (B1), FCE (B2), CAE (C1), CPE (C2)</li>
      </ul>
      
      <h3>How to Determine Your CEFR Level</h3>
      <p>There are several ways to determine your CEFR level:</p>
      <ul>
        <li><strong>Self-Assessment:</strong> Use the "I can" statements provided by the Council of Europe to evaluate your abilities.</li>
        <li><strong>Placement Tests:</strong> Many language schools and online platforms offer placement tests aligned with CEFR.</li>
        <li><strong>Standardized Exams:</strong> Taking exams like IELTS, TOEFL, or Cambridge English can provide official certification of your level.</li>
      </ul>
      
      <h3>Setting Goals with CEFR</h3>
      <p>CEFR can help you set realistic and achievable language learning goals:</p>
      <ul>
        <li><strong>Short-term Goals:</strong> Focus on specific skills or competencies within your current level.</li>
        <li><strong>Medium-term Goals:</strong> Aim to progress to the next CEFR level within a specific timeframe.</li>
        <li><strong>Long-term Goals:</strong> Set targets like reaching B2 for university studies or C1 for professional purposes.</li>
      </ul>
      
      <h3>Conclusion</h3>
      <p>The Common European Framework of Reference for Languages provides a valuable tool for language learners, teachers, and institutions. By understanding the six CEFR levels and what they represent, you can better assess your current abilities, set realistic goals, and track your progress on your English learning journey. Whether you're learning for personal, academic, or professional reasons, CEFR offers a clear path forward and a way to measure your success.</p>
    `,
    author: "Lisa Thompson",
    date: "March 5, 2023",
    readTime: "12 min read",
    category: "CEFR",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
    imageAlt: "CEFR language levels chart and progression",
    tags: ["CEFR", "Language Levels", "Language Assessment"],
    relatedPosts: [
      {
        id: 1,
        title: "5 Effective Strategies for Learning English Vocabulary",
        slug: "effective-strategies-for-learning-english-vocabulary",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
        imageAlt: "Person studying vocabulary",
        category: "Learning Tips",
        date: "May 15, 2023"
      },
      {
        id: 3,
        title: "The Benefits of Immersion Learning",
        slug: "benefits-of-immersion-learning",
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
        imageAlt: "Students in immersion learning environment",
        category: "Learning Methods",
        date: "April 10, 2023"
      },
      {
        id: 2,
        title: "IELTS Speaking Test: Common Mistakes to Avoid",
        slug: "ielts-speaking-test-common-mistakes",
        image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
        imageAlt: "Person taking IELTS test",
        category: "IELTS Preparation",
        date: "April 28, 2023"
      }
    ]
  },
  {
    id: 6,
    slug: "pronunciation-tips-non-native-speakers",
    title: "Pronunciation Tips for Non-Native Speakers",
    excerpt: "Improve your English pronunciation with these practical exercises and techniques.",
    content: `
      <p>Pronunciation is one of the most challenging aspects of learning English for non-native speakers. Unlike grammar or vocabulary, which can be studied through books and exercises, pronunciation requires careful listening, practice, and feedback. This comprehensive guide provides practical tips and techniques to help you improve your English pronunciation and sound more natural when speaking.</p>
      
      <h3>Why Pronunciation Matters</h3>
      <p>Clear pronunciation is essential for effective communication. Even with perfect grammar and extensive vocabulary, poor pronunciation can lead to misunderstandings and make it difficult for others to understand you. Good pronunciation also boosts your confidence when speaking English and helps you integrate more easily into English-speaking environments.</p>
      
      <h3>Understanding the Challenges</h3>
      <p>Non-native speakers face several common challenges when learning English pronunciation:</p>
      <ul>
        <li><strong>Sounds Not in Your Native Language:</strong> English has sounds that may not exist in your native language, making them difficult to produce.</li>
        <li><strong>Stress and Intonation:</strong> English uses stress (emphasis on certain syllables) and intonation (the rise and fall of voice) differently than many other languages.</li>
        <li><strong>Connected Speech:</strong> Native speakers often connect words in ways that can be confusing for learners.</li>
        <li><strong>Rhythm:</strong> English has a distinctive rhythm that can be challenging to master.</li>
      </ul>
      
      <h3>Essential Pronunciation Tips</h3>
      
      <h4>1. Listen Actively</h4>
      <p>Before you can produce English sounds correctly, you need to be able to hear them accurately. Spend time listening to native speakers through podcasts, movies, TV shows, and conversations. Pay attention to how sounds are formed, which syllables are stressed, and how intonation changes in questions versus statements.</p>
      <p>Try this exercise: Listen to a short audio clip of a native speaker, then repeat exactly what they said, trying to mimic their pronunciation, stress, and intonation as closely as possible.</p>
      
      <h4>2. Learn the International Phonetic Alphabet (IPA)</h4>
      <p>The IPA is a system of symbols that represent the sounds of spoken language. Learning IPA can help you understand how to pronounce words correctly, especially when you encounter new vocabulary. Many dictionaries include IPA transcriptions to help with pronunciation.</p>
      <p>Start by learning the basic vowel and consonant sounds of English, then practice recognizing and producing them. There are many online resources and apps that can help you learn IPA.</p>
      
      <h4>3. Focus on Problem Sounds</h4>
      <p>Identify the English sounds that are particularly challenging for speakers of your native language. For example:</p>
      <ul>
        <li><strong>For Spanish speakers:</strong> The "th" sounds (as in "think" and "this"), vowel sounds like the difference between "ship" and "sheep"</li>
        <li><strong>For Japanese speakers:</strong> The "l" and "r" distinction, final consonants</li>
        <li><strong>For French speakers:</strong> The "h" sound, stress on words</li>
        <li><strong>For Mandarin speakers:</strong> Consonant clusters at the beginning or end of words, vowel sounds</li>
      </ul>
      <p>Once you've identified your problem sounds, practice them specifically. Look for minimal pairs (words that differ by only one sound, like "ship" and "sheep") and practice saying them.</p>
      
      <h4>4. Master Word Stress</h4>
      <p>English is a stress-timed language, which means that stressed syllables occur at regular intervals, regardless of how many syllables are between them. Placing stress on the wrong syllable can make your speech difficult to understand.</p>
      <p>Learn the rules of word stress in English:</p>
      <ul>
        <li>Most two-syllable nouns have stress on the first syllable (e.g., "TA-ble")</li>
        <li>Most two-syllable verbs have stress on the second syllable (e.g., "pre-SENT")</li>
        <li>Words ending in -tion, -sion, -ic usually have stress on the syllable before these endings (e.g., "infor-MA-tion")</li>
      </ul>
      <p>Practice by listening to how native speakers stress words and try to imitate them. Use a dictionary to check stress patterns of new words.</p>
      
      <h4>5. Understand Sentence Stress and Intonation</h4>
      <p>In English, not all words in a sentence are equally stressed. Content words (nouns, verbs, adjectives, adverbs) are usually stressed, while function words (articles, prepositions, conjunctions) are often reduced.</p>
      <p>Intonation (the melody of speech) is also important. For example:</p>
      <ul>
        <li><strong>Yes/No Questions:</strong> Rising intonation at the end ("Are you COMing?")</li>
        <li><strong>Wh-Questions:</strong> Falling intonation at the end ("WHERE are you GOing?")</li>
        <li><strong>Statements:</strong> Falling intonation at the end ("I'm GOing HOME.")</li>
      </ul>
      <p>Listen to how native speakers use sentence stress and intonation, and practice imitating these patterns.</p>
      
      <h4>6. Practice Connected Speech</h4>
      <p>Native speakers don't pronounce each word separately; they connect words in various ways. Understanding connected speech can help you both understand others better and sound more natural yourself.</p>
      <p>Common connected speech features include:</p>
      <ul>
        <li><strong>Linking:</strong> Connecting the final sound of one word to the first sound of the next (e.g., "I want to" becomes "I wanna")</li>
        <li><strong>Assimilation:</strong> Changing a sound to make it easier to pronounce (e.g., "good boy" may sound like "gub boy")</li>
        <li><strong>Elision:</strong> Leaving out sounds (e.g., "camera" may sound like "camra")</li>
      </ul>
      <p>Practice listening for and using these features in your own speech.</p>
      
      <h4>7. Record Yourself</h4>
      <p>Recording yourself speaking English can be eye-opening. We often don't realize how we sound to others. Listen to your recordings and compare them with native speakers. Identify areas for improvement and track your progress over time.</p>
      
      <h4>8. Use Technology</h4>
      <p>There are many apps and tools designed to help with pronunciation:</p>
      <ul>
        <li><strong>Pronunciation Apps:</strong> Apps like ELSA Speak, Pronounce, and Speechling provide instant feedback on your pronunciation.</li>
        <li><strong>Forvo:</strong> A website where you can hear how words are pronounced by native speakers from around the world.</li>
        <li><strong>YouGlish:</strong> A tool that lets you search for how words and phrases are pronounced in YouTube videos.</li>
      </ul>
      
      <h4>9. Work with a Partner or Tutor</h4>
      <p>Getting feedback from others is crucial for improving pronunciation. A language partner or tutor can point out errors you might not notice yourself and provide guidance on how to correct them.</p>
      
      <h4>10. Be Patient and Persistent</h4>
      <p>Improving pronunciation takes time and consistent practice. Don't get discouraged if you don't see immediate results. Celebrate small improvements and keep practicing regularly.</p>
      
      <h3>Specific Exercises for Common Problems</h3>
      
      <h4>For "th" Sounds</h4>
      <p>Practice words like "think," "this," "that," and "they." For the "th" sound in "think," place your tongue between your teeth and blow air out gently. For the "th" sound in "this," do the same but use your voice.</p>
      
      <h4>For "l" and "r" Distinction</h4>
      <p>Practice minimal pairs like "light" and "right," "fly" and "fry," or "collect" and "correct." For the "l" sound, place the tip of your tongue behind your upper front teeth. For the "r" sound, pull your tongue back without touching the roof of your mouth.</p>
      
      <h4>For Vowel Sounds</h4>
      <p>Practice distinguishing between similar vowel sounds like "ship" and "sheep," "full" and "fool," or "bat" and "bet." Pay attention to mouth position and tongue placement for each sound.</p>
      
      <h3>Conclusion</h3>
      <p>Improving your English pronunciation is a journey that requires patience, practice, and persistence. By focusing on the areas that are most challenging for you and using the tips and techniques provided in this guide, you can make significant progress. Remember that clear pronunciation is not about eliminating your accent completely but about being easily understood. With regular practice and the right resources, you'll develop pronunciation skills that will enhance your overall English communication.</p>
    `,
    author: "James Wilson",
    date: "February 18, 2023",
    readTime: "15 min read",
    category: "Pronunciation",
    image: "https://images.unsplash.com/photo-1533281584759-31329ab1727d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
    imageAlt: "English pronunciation practice with a teacher",
    tags: ["Pronunciation", "Speaking Skills", "Accent Reduction"],
    relatedPosts: [
      {
        id: 2,
        title: "IELTS Speaking Test: Common Mistakes to Avoid",
        slug: "ielts-speaking-test-common-mistakes",
        image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
        imageAlt: "Person taking IELTS test",
        category: "IELTS Preparation",
        date: "April 28, 2023"
      },
      {
        id: 4,
        title: "Business English: Email Writing Essentials",
        slug: "business-english-email-writing",
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
        imageAlt: "Business email writing",
        category: "Business English",
        date: "March 22, 2023"
      },
      {
        id: 1,
        title: "5 Effective Strategies for Learning English Vocabulary",
        slug: "effective-strategies-for-learning-english-vocabulary",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
        imageAlt: "Person studying vocabulary",
        category: "Learning Tips",
        date: "May 15, 2023"
      }
    ]
  }
]

// Function to get all blog posts
export function getAllBlogPosts(): BlogPost[] {
  return blogPosts
}

// Function to get a single blog post by slug
export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find(post => post.slug === slug)
}

// Function to get related blog posts (excluding the current post)
export function getRelatedBlogPosts(currentPostId: number, limit = 3): BlogPost[] {
  return blogPosts
    .filter(post => post.id !== currentPostId)
    .slice(0, limit)
}

// Function to get unique categories
export function getAllCategories(): { name: string; count: number }[] {
  const categoryCount: Record<string, number> = {}
  
  blogPosts.forEach(post => {
    if (categoryCount[post.category]) {
      categoryCount[post.category]++
    } else {
      categoryCount[post.category] = 1
    }
  })
  
  return Object.entries(categoryCount).map(([name, count]) => ({ name, count }))
}

// Function to get unique tags
export function getAllTags(): string[] {
  const tagSet = new Set<string>()
  
  blogPosts.forEach(post => {
    post.tags.forEach(tag => tagSet.add(tag))
  })
  
  return Array.from(tagSet)
}

// Function to generate table of contents from HTML content
export function generateTableOfContents(htmlContent: string): { id: string; title: string; level: number }[] {
  // Check if we're in a browser environment
  if (typeof window === 'undefined') {
    return []
  }

  // Create a temporary div element to parse the HTML
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = htmlContent;
  
  // Find all heading elements (h1, h2, h3, etc.)
  const headings = tempDiv.querySelectorAll('h1, h2, h3, h4, h5, h6');
  
  const tableOfContents: { id: string; title: string; level: number }[] = [];
  
  headings.forEach((heading) => {
    // Get the heading level (1 for h1, 2 for h2, etc.)
    const level = parseInt(heading.tagName.charAt(1));
    
    // Get the heading text
    const title = heading.textContent || '';
    
    // Generate an ID for the heading based on the text
    const id = title
      .toLowerCase()
      .replace(/[^\w\s]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .trim();
    
    // Ensure the ID is unique
    const existingIds = tableOfContents.map(item => item.id);
    let uniqueId = id;
    let counter = 1;
    
    while (existingIds.includes(uniqueId)) {
      uniqueId = `${id}-${counter}`;
      counter++;
    }
    
    // Add the heading to the table of contents
    tableOfContents.push({
      id: uniqueId,
      title,
      level
    });
  });
  
  return tableOfContents;
}

// Function to get a blog post with generated table of contents
export function getBlogPostWithTOC(slug: string): BlogPost | undefined {
  const post = getBlogPostBySlug(slug);
  
  if (!post) {
    return undefined;
  }
  
  // Generate table of contents if it doesn't exist
  if (!post.tableOfContents) {
    post.tableOfContents = generateTableOfContents(post.content);
  }
  
  return post;
}

// Function to add IDs to headings in HTML content
export function addIdsToHeadings(htmlContent: string, tableOfContents: { id: string; title: string; level: number }[]): string {
  // Check if we're in a browser environment
  if (typeof window === 'undefined') {
    return htmlContent;
  }

  const modifiedContent = htmlContent;
  
  // Create a temporary div element to parse the HTML
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = htmlContent;
  
  // Find all heading elements (h1, h2, h3, etc.)
  const headings = tempDiv.querySelectorAll('h1, h2, h3, h4, h5, h6');
  
  headings.forEach((heading) => {
    // Get the heading level (1 for h1, 2 for h2, etc.)
    const level = parseInt(heading.tagName.charAt(1));
    
    // Get the heading text
    const title = heading.textContent || '';
    
    // Find the corresponding TOC item
    const tocItem = tableOfContents.find(item => 
      item.title === title && item.level === level
    );
    
    if (tocItem) {
      // Add the ID to the heading
      heading.id = tocItem.id;
      
      // Add a class for styling
      heading.classList.add('scroll-mt-24');
    }
  });
  
  return tempDiv.innerHTML;
}

// Function to generate a static table of contents for server-side rendering
export function generateStaticTableOfContents(htmlContent: string): { id: string; title: string; level: number }[] {
  // Simple regex-based parser for server-side rendering
  const headingRegex = /<h([1-6])(?:\s+[^>]*)?>(.*?)<\/h[1-6]>/g;
  const tableOfContents: { id: string; title: string; level: number }[] = [];
  let match;
  
  while ((match = headingRegex.exec(htmlContent)) !== null) {
    const level = parseInt(match[1]);
    // Extract text content from HTML
    const textContent = match[2].replace(/<[^>]*>/g, '');
    
    // Generate an ID for the heading based on the text
    const id = textContent
      .toLowerCase()
      .replace(/[^\w\s]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .trim();
    
    // Ensure the ID is unique
    const existingIds = tableOfContents.map(item => item.id);
    let uniqueId = id;
    let counter = 1;
    
    while (existingIds.includes(uniqueId)) {
      uniqueId = `${id}-${counter}`;
      counter++;
    }
    
    tableOfContents.push({
      id: uniqueId,
      title: textContent,
      level
    });
  }
  
  return tableOfContents;
}

// Function to add IDs to headings in HTML content for server-side rendering
export function addIdsToHeadingsStatic(htmlContent: string, tableOfContents: { id: string; title: string; level: number }[]): string {
  let modifiedContent = htmlContent;
  
  // Process each heading in the table of contents
  tableOfContents.forEach(tocItem => {
    // Create a regex to find the heading
    const headingRegex = new RegExp(`<h${tocItem.level}(\\s+[^>]*)?>${escapeRegExp(tocItem.title)}</h${tocItem.level}>`, 'g');
    
    // Replace the heading with one that has an ID and class
    modifiedContent = modifiedContent.replace(headingRegex, `<h${tocItem.level}$1 id="${tocItem.id}" class="scroll-mt-24">${tocItem.title}</h${tocItem.level}>`);
  });
  
  return modifiedContent;
}

// Helper function to escape special characters in regex
function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}