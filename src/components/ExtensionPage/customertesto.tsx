import { Star } from "@phosphor-icons/react/dist/ssr";
import React from "react";
import TestomonialAction from "./testomonialaction";

function CustomerFeedbackSection() {
  let extensionreviewurl =
    "https://chromewebstore.google.com/detail/fiverr-mate-fiverr-gig-se/pfnlgphmiaoifnibdpneedbodehafgek/reviews?utm_source=ext_app_menu";
  let reviews = [
    {
      image_url:
        "https://lh3.googleusercontent.com/a/ACg8ocIFhDxTd6zs9FAoEH_PwYgwOh7aqc_yxdDpaCcAzRWY=s48-w48-h48",
      name: "Muhammad Ali QURESHI",
      comment: "Excellent extension.",
    },
    {
      image_url:
        "https://lh3.googleusercontent.com/a-/ALV-UjWgqGpqemloZBXOgECZryO6zawzV-3Tsfyfeijy4j-M5bA=s48-w48-h48",
      name: "RLX Feel",
      comment:
        "Outstanding extension for generating title, description, keywords, faqs using AI for Fiverr Gig",
    },
    {
      image_url:
        "https://lh3.googleusercontent.com/a/ACg8ocI7xDKxHp1YyPf2oSIkCM4qr-tETADiNfiQeNqAwgg9=s48-w48-h48",
      name: "Ra nk",
      comment: "very good app i like this",
    },
    {
      image_url:
        "https://lh3.googleusercontent.com/a-/ALV-UjX9WQBt84nnJ7oUkBDz5xtT_OxHR1RDLpiv8DM6Ps0dK8M=s48-w48-h48",
      name: "Ahsan Rashid",
      comment: "I like their services to write a perfect gig description",
    },
    {
      image_url:
        "https://lh3.googleusercontent.com/a-/ALV-UjUXxLv63gFYWcvNNcdDb96VJIwgpiUmhoZA_QKdNdMwJg=s48-w48-h48",
      name: "Umar Majeed",
      comment: "Very Usefull extension, for those who know how to use it.",
    },
    {
      image_url:
        "https://lh3.googleusercontent.com/a/ACg8ocI25ruuXVmoHau7w4Kztz8_CvZOcK3rPbMlJio4ZQ9t=s48-w48-h48",
      name: "Ola Abolarin",
      comment:
        "one of best app tools l have ever used. It really help in ranking my fiverr account as a beginner it makes working and earning easier for me.",
    },
    {
      image_url:
        "https://lh3.googleusercontent.com/a/ACg8ocLVv3Xn1HGeJ9CYP_g_1eKDfWzuxEw5ihYNe9SSFpaJ=s48-w48-h48",
      name: "Yorubawa TV",
      comment:
        "Kudos to the developer of this most amazing helpful app, it makes working and earning on Fiver easier, thank you for this!",
    },
    {
      image_url:
        "https://lh3.googleusercontent.com/a/ACg8ocKlvv4H6Nnl2mvpacWPgRgK_n2S6Nfnt1WLkrtvTdKK=s48-w48-h48",
      name: "Kiran Ishfaq",
      comment: "amazing extension",
    },
    {
      image_url:
        "https://lh3.googleusercontent.com/a-/ALV-UjU3SY4X_oMZmXQeZ0DH5BD0b4TRID6H_QLTVUfgQiaTOuU=s48-w48-h48",
      name: "Ahtasham Ali",
      comment: "very good extension\nvery helpful and easy to use",
    },
    {
      image_url:
        "https://lh3.googleusercontent.com/a/ACg8ocIUbTnE4x4gRiBneeTQT7bhNVpjO3adMAPJZk55Hxyt=s48-w48-h48",
      name: "Playingly Playingly",
      comment:
        "amazing tool. really  helpful. I optimized my fiverr gig and got amazing results. keyword suggestion and title extract option is the best",
    },
    {
      image_url:
        "https://lh3.googleusercontent.com/a-/ALV-UjXdlDDTsxCVyvKIMsu4IkPAMdAGKDUQSIkJ89qomT0qi1U=s48-w48-h48",
      name: "adesanmi mayowa",
      comment: "great app i use it from my gig ranking",
    },
    {
      image_url:
        "https://lh3.googleusercontent.com/a-/ALV-UjUYP4-6EwjqEJ4PJSYAkCq44aDu7R_pmEsQwwWojXKnEKk=s48-w48-h48",
      name: "chaudhary ahmad",
      comment:
        "I REALLY LIKE THIS TOOL ITS A SO MUCH BEST FOR BEGGENER FREELANCER IF ANYONE WANT TO RANKE YOUR GIG SO HURRY UP JUST USE THIS TOOL ITS OWESOME",
    },
    {
      image_url:
        "https://lh3.googleusercontent.com/a-/ALV-UjW8R4cLzIPTtd-TIcsoLA78vM20i5mFBcLXEJY3tC7S15o=s48-w48-h48",
      name: "MD FOYSAL",
      comment: "good",
    },
    {
      image_url:
        "https://lh3.googleusercontent.com/a/ACg8ocJcems2IfO9QU1WT-sECq7Z57qOdp6xclRoBG3XbiS6=s48-w48-h48",
      name: "Victor Digital",
      comment: "Great tool with mind-blowing features. Thumbs up.",
    },
    {
      image_url:
        "https://lh3.googleusercontent.com/a/ACg8ocI9-HfKt1GCST5l2qfkH8Wghebmq8N88lHoDRKOXuwP=s48-w48-h48",
      name: "Gimhan Rajapaksha",
      comment: "cant register to the extensions",
    },
    {
      image_url:
        "https://lh3.googleusercontent.com/a-/ALV-UjVqNjIY6WJw19abX68LSxTsq1i-h1J_eEDEntwyGNNTCw=s48-w48-h48",
      name: "Rabbi Hossain",
      comment: "amazing tools",
    },
    {
      image_url:
        "https://lh3.googleusercontent.com/a-/ALV-UjV77Rji5ThelEzw5ZfxitiQrqAn_W-Y1TwEIQD32kb43b_N=s48-w48-h48",
      name: "Tushar Ahmed",
      comment: "I can't register? Why",
    },
    {
      image_url:
        "https://lh3.googleusercontent.com/a-/ALV-UjWNfWr7TmPb-gWu-ff0TkKAHQFAeQq_GqRPCLpg6LlSJwE=s48-w48-h48",
      name: "Obeyadur Rahman",
      comment: "I can't register",
    },
    {
      image_url:
        "https://lh3.googleusercontent.com/a/ACg8ocLnVkurE2gKPaSeorqLkNWIvn5qax4toqVT0jKi3ruF=s48-w48-h48",
      name: "anju chaudhary",
      comment: "I am able to login now with the help of your team. Thank you!",
    },
    {
      image_url:
        "https://lh3.googleusercontent.com/a-/ALV-UjVTC-4ov-YHYvkI2UuW1p9GHRsZXZiVeSR0iLP2mf2hag=s48-w48-h48",
      name: "Mohammad Mahim",
      comment: "Takes all the research effort away.Great system",
    },
    {
      image_url:
        "https://lh3.googleusercontent.com/a-/ALV-UjV70Y5kCI3Zwjvufuf7hPfPu-o6abGRLLn9PybbDnWc0Jw=s48-w48-h48",
      name: "timothy lowe",
      comment: "Takes all the research effort away.Great system",
    },
    {
      image_url:
        "https://lh3.googleusercontent.com/a-/ALV-UjWDcxxEpgaJDQqouxjGNgQcWdoLLeA1ylhH14mQaoQ7aw=s48-w48-h48",
      name: "Rajni Master",
      comment:
        "It is the best extension for Fiverr sellers. It helps me to create SEO-optimized gigs with titles, tags, and descriptions generated by AI. It also analyzes my gigs and compares them with other gigs in the same category. It gives me tips on how to improve my gigs and rank higher in Fiverr search results. Fiverr Mate is easy to use and affordable. It has increased my sales and saved me a lot of time and effort. The only thing I would like to see improved is the customer support. Sometimes I hav... Show more",
    },
    {
      image_url:
        "https://lh3.googleusercontent.com/a-/ALV-UjUC_-hO3NLey1QFKfLCMuxJ6Qx25bBY5Zre8khAt1r1Rbg=s48-w48-h48",
      name: "Nelum Prabashani",
      comment:
        "Outstanding Experience! Your developers are awesome. Love it <3",
    },
    {
      image_url:
        "https://lh3.googleusercontent.com/a-/ALV-UjXJXg4RtPM9ZQBXtUrfhDH4hVvlSkEfqG4hrz4oJQC7Sg=s48-w48-h48",
      name: "Umer Ali",
      comment:
        "I'm glad to hear that you found Fiverr Mate: Fiverr Gig SEO Tool helpful in your gig ranking efforts. It's great that you found the features useful and easy to use. I'm sure the team behind it appreciates your feedback, and they might consider your suggestion for new features. \n\nThank you for sharing your positive experience!",
    },
    {
      image_url:
        "https://lh3.googleusercontent.com/a-/ALV-UjVa6ODpitQLHlONLZODoptslfXTXTBhzpW2YJFbWHbd6zE=s48-w48-h48",
      name: "Hai Nguyen",
      comment: "Helpful tool and very friendly .",
    },
    {
      image_url:
        "https://lh3.googleusercontent.com/a/ACg8ocLM77fIDhKZRmPVXY-0Zp6H5Oe80AMH6EYSzXPq7P-i=s48-w48-h48",
      name: "Lucy Wangithi",
      comment: "I really loved it, very helpful great extension!!",
    },
    {
      image_url:
        "https://lh3.googleusercontent.com/a-/ALV-UjX5pmXZeU0Hl9x5grwoR0ubDdX0mgu87wV-6lDBNPM4i_50=s48-w48-h48",
      name: "Mdsamrat",
      comment:
        "Fiverr Mate is an invaluable tool for anyone looking to boost their Fiverr gig's visibility and reach a broader audience. With this user-friendly software, optimizing your gig for SEO has never been easier. I've seen a noticeable improvement in my gig's rankings and, subsequently, an increase in orders since using Fiverr Mate. The keyword research and suggestions are particularly helpful, allowing me to target the right audience effectively. It's a must-have tool for any Fiverr seller serious... Show more",
    },
    {
      image_url:
        "https://lh3.googleusercontent.com/a-/ALV-UjU6fuak37XtgU2PVap7MiXb6wQhMKaTnbEXGIJKp8s4M9Y=s48-w48-h48",
      name: "Malik Munir",
      comment: "Very helpfull\nThanks Fivermate team",
    },
    {
      image_url:
        "https://lh3.googleusercontent.com/a-/ALV-UjXwu_gY0QIblI66R4zIsf_JJtBAUqPTrKJMG0FLYgvqDPI=s48-w48-h48",
      name: "Kamran Mansoor",
      comment:
        'Fiverr Mate extension is very helpful to me as I was experiencing Gig Ranking and HERE COMES "FIVERR MATE"\nThankYou Team',
    },
    {
      image_url:
        "https://lh3.googleusercontent.com/a/ACg8ocLwwyUKJv4QbCGzt9sNoYiwrLlg-bVAvz-uJ1QbtYEu=s48-w48-h48",
      name: "Aqsa Rafique",
      comment: "Wonderful app. Its save time and effort",
    },
    {
      image_url:
        "https://lh3.googleusercontent.com/a/ACg8ocJAzWqqk5I2MCDFVX6UwF8eOsF5A1KEsyzbcG1IkCv6=s48-w48-h48",
      name: "Adeyemi Toyin",
      comment: "Awesome",
    },
    {
      image_url:
        "https://lh3.googleusercontent.com/a/ACg8ocJ7VruQPCGRdzljZdpwmq1IvC0w8CbYfqcMU_GzSCpV=s48-w48-h48",
      name: "prof carry",
      comment:
        "this extension is amazing and easy to use, keywords and title extractor feature is my favourite, I created a gig with fiverr mate and new 2 days i received my first order I'm so exited to see more features and improvement in this extension THANKYOU",
    },
    {
      image_url:
        "https://lh3.googleusercontent.com/a-/ALV-UjVkjbXRbjP10iDi1Vg0zGhO1HY2nFNOJSXkfXIH-2vhtQ=s48-w48-h48",
      name: "SURJA CHAKMA",
      comment: "Very Good extension tools. Its very helpful.",
    },
    {
      image_url:
        "https://lh3.googleusercontent.com/a-/ALV-UjUgBPQxf9IicsEjmfgqe0LuxeWa1JQWOHH8zV6b-xbCyQ=s48-w48-h48",
      name: "Funny Live",
      comment:
        "This tool helped me getting my desired results with the ai tools. Mostly, I like the keyword option that makes it so easy. I think the tutorial should be a little more detailed. In the conclusion, this extension is very easy to work with, some clicks and you can scale your business! Compared to other extensions, this is next level!",
    },
    {
      image_url:
        "https://lh3.googleusercontent.com/a-/ALV-UjWtyTP-ZUGsqdAzYQbim7g5buEaPHdfxoZwErfh8jgslw=s48-w48-h48",
      name: "Onirban",
      comment:
        '"This extension stands out as the most exceptional tool that assisted me in discovering compelling keywords, crafting captivating titles, and identifying any errors in my gig. Its invaluable assistance greatly contributes to the improved ranking of my gigs. I highly endorse and recommend it!"',
    },
    {
      image_url:
        "https://lh3.googleusercontent.com/a-/ALV-UjVhu3iX_7Y4xuQU3vAxR_dCyMDr1bVMH6xilTMOXJlOuaE=s48-w48-h48",
      name: "Deepesh Kumar",
      comment:
        'The Extension is really helpful and does what it offers. As soon as the extension is installed it starts doing its work, You may reach out their customer service if you face any issues. I am certain that a Freelancer will get top notch insights from the use of this extension and as promised "Your Freelancing Career Will Change From Here".',
    },
    {
      image_url:
        "https://lh3.googleusercontent.com/a/ACg8ocIG0-EmMEdMfBqMPLTy5NwR8NBo8DRgQLPtp4F1_hlD=s48-w48-h48",
      name: "Haadi Rajput",
      comment:
        "It is the most particular extension who helped me to find attractive keywords, amazing titles and help me to find mistakes in my gig So helpful to rank gigs ultimately. Highly recommended",
    },
    {
      image_url:
        "https://lh3.googleusercontent.com/a/ACg8ocI3RChlQb7vuZwKPi0zz6hGuh1bdvXVg_iAcll_M8AQ=s48-w48-h48",
      name: "Enoch",
      comment: "It's very good extension",
    },
    {
      image_url:
        "https://lh3.googleusercontent.com/a-/ALV-UjWeu1oUlRQ9xFg-qaZBH-7YDkfosi7UF-35nYbNVeByRqA=s48-w48-h48",
      name: "Ovais",
      comment:
        "Fiverr mate has helped me to achieve my goal of ranking on 1st page. I love the gig cloner tool the most. I think the app can add further features to highlight competitor gig's performance over the period of time, maybe their revenue as well. The app fiverr mate is easy and user friendly.",
    },
    {
      image_url:
        "https://lh3.googleusercontent.com/a-/ALV-UjXzPVUF6gO3OESo6mEODZE5fbQsQ-ZV3eLxkWoBaVllSAs=s48-w48-h48",
      name: "Olaobaju Babatunde Joseph",
      comment:
        "This is a superb tool and extension, it has helped me alot and still doing. it is very useful especially when researching on keyword. This is the best Fiverr SEO extension.",
    },
    {
      image_url:
        "https://lh3.googleusercontent.com/a-/ALV-UjVpTDVdmW1BWCMgtLeijHTAVLjJApsY1ChCDeovPgX9gNA=s48-w48-h48",
      name: "shafi Ahmed",
      comment:
        "When i am going to publish a gig i have struggle very much but when i am starting using Fiverr Mate: Fiverr Gig SEO Tool believed me i really help me to rank in first page. almost all features are really helpful btw and also really easy to use u are not going to frustrated its really helpful and lastly  i am looking foreword to see there new features \n\nThank you the whole team member",
    },
    {
      image_url:
        "https://lh3.googleusercontent.com/a-/ALV-UjVFva7TGMZ5b693yKO_ns6rq7SyKTEuRlLQtZUBjX9UPw=s48-w48-h48",
      name: "Fiverr Review Sale - ফাইবার রিভিউ",
      comment:
        "Fiverr Mate has completely transformed my Fiverr experience! This nifty Chrome extension is like having a personal gig-seeking sidekick, enhancing my freelancing journey in ways I never thought possible. With its intuitive interface and powerful search capabilities, finding the perfect gigs has never been smoother. I'm blown away by how it effortlessly narrows down my search, saving me precious time and boosting my productivity. Plus, the added bonus of seamless integration with Fiverr's plat... Show more",
    },
    {
      image_url:
        "https://lh3.googleusercontent.com/a/ACg8ocKDZfF7ODUFzvdVAMmnDAQGY-psinRxyeuwQ_t7LfgX=s48-w48-h48",
      name: "Charlotte Luna",
      comment: "cool",
    },
    {
      image_url:
        "https://lh3.googleusercontent.com/a-/ALV-UjXPgEP5gW-x1JpOnj_fjgpEqsVWryp3i-NooOsLteeJnq8=s48-w48-h48",
      name: "Sajid Ali",
      comment: "I just loved you all shortcut ideas.",
    },
    {
      image_url:
        "https://lh3.googleusercontent.com/a-/ALV-UjVw41dSYLIs22ZA8CDnYe_189xFg34FQJPehJqj5bgsYQ=s48-w48-h48",
      name: "Abdul Saboor",
      comment:
        "great excellent helpful tool Extension. Fiverr mate make very easy to rank on fiverr outstanding",
    },
    {
      image_url:
        "https://lh3.googleusercontent.com/a/ACg8ocIYVZys77TxEaQc4nwak_rvVchZXrGr-ksXwlwdBOEK=s48-w48-h48",
      name: "elugbemi samson",
      comment:
        "i found this very interesting and very helpful, keep good work going.",
    },
    {
      image_url:
        "https://lh3.googleusercontent.com/a/ACg8ocJd9rxXMwzAuf3LavOQSFEKEb4rR-hCMm5UAnlvGUzy=s48-w48-h48",
      name: "Prince Singh",
      comment:
        "this is amazing and easy to use, keywords and title extractor feature is my fav, i created a gig with fiverr mate and new 2 days i received my first order i'm so exited to see more features and improvement in this extension :)",
    },
    {
      image_url:
        "https://lh3.googleusercontent.com/a/ACg8ocIHOmfngcPo4Htiffsm1qsYX5VC1WU39a8Szr7tzBFZ=s48-w48-h48",
      name: "Sir Faith",
      comment: "great extension",
    },
    {
      image_url:
        "https://lh3.googleusercontent.com/a/ACg8ocL0UnV2G0ksZkhyqcYxikj-6pnQ0W3PR-9NA2g7h2LV=s48-w48-h48",
      name: "Vasyl Khmarenko",
      comment: "Super convenient tool. Recommend",
    },
    {
      image_url:
        "https://lh3.googleusercontent.com/a/ACg8ocJllIcVM-hXQJuHn95_riWnpzV-ZfLftdqmmUJAkomf=s48-w48-h48",
      name: "Ahmed Imdad",
      comment: "It's great thing so far I checked. Really helpful for me.",
    },
    {
      image_url:
        "https://lh3.googleusercontent.com/a/ACg8ocJvh1JgFoRm5CHJ6zLH5Xl-CGJYEWHqMhv0tu_hDlA5=s48-w48-h48",
      name: "Ayub Ali Gazi",
      comment: "great",
    },
    {
      image_url:
        "https://lh3.googleusercontent.com/a-/ALV-UjVPSLLXGmH0DYAEEM5qaypRP8wjWFe3LRgCzppTOzm--bo=s48-w48-h48",
      name: "Humira Haque",
      comment: "very helpful extension.",
    },
    {
      image_url:
        "https://lh3.googleusercontent.com/a/ACg8ocIq6g0Ukutw7ROUyey0VXa6EH8NBOcJOxaWzH0QaQZF=s48-w48-h48",
      name: "Jordany Austiny",
      comment: "Very Good Extension. I love it",
    },
    {
      image_url:
        "https://lh3.googleusercontent.com/a-/ALV-UjV3ELL1q01f3BPziDRsFV5EjsXg4mmmQwXqmpd2LeeJ91A=s48-w48-h48",
      name: "Mahmud Hasan",
      comment:
        "this extension is very helpful and save our time for fiver research",
    },
    {
      image_url:
        "https://lh3.googleusercontent.com/a/ACg8ocIQGjhxeFc_ALf8poWj3GnCGdkCAa7AzXimCJQLBrBa=s48-w48-h48",
      name: "Facts Brain",
      comment: "Give me free",
    },
    {
      image_url:
        "https://lh3.googleusercontent.com/a/ACg8ocJqZMRID700JK1_LLPt0MmcKe7zUIgv7VRmqMiCMN5B=s48-w48-h48",
      name: "Jay Patel",
      comment: "Greate extension",
    },
    {
      image_url:
        "https://lh3.googleusercontent.com/a/ACg8ocIRNbM7IgY_Aj9tjPtWvoQkiC8VXOU4eb_18lQiGhCT=s48-w48-h48",
      name: "Abdulfatai Ridwan",
      comment:
        "wow this is very exciting beyond my expectation no stress to rank my fiverr gig to first page.",
    },
    {
      image_url:
        "https://lh3.googleusercontent.com/a-/ALV-UjWp3H4zpifCD52Rgl5pSTqCTqGilOAJjl77aTWO-tZxtgY=s48-w48-h48",
      name: "Abdul Rafay Ahmed",
      comment: "Amazing Extension",
    },
    {
      image_url:
        "https://lh3.googleusercontent.com/a/ACg8ocKGCp78L3UWrCCogpDPwpGkvvtg1BAFy18kNUsg-EMH=s48-w48-h48",
      name: "Emre Ak",
      comment: "Absolutely awesome app",
    },
    {
      image_url:
        "https://lh3.googleusercontent.com/a-/ALV-UjUVKVkXNPMG_ogSRaCvAlPFIukqhk0lbW94YZ61aXlN7A=s48-w48-h48",
      name: "Sana Salman",
      comment:
        "extension is really a life nice and so good. It is very easy and faster to create flawless gigs",
    },
    {
      image_url:
        "https://lh3.googleusercontent.com/a-/ALV-UjXNj_9LyXUXVStXXNIHJtv6R6llepLtddnAkg1J0oGVggw=s48-w48-h48",
      name: "Muhammad Arslan",
      comment: "So helpful to rank gigs ultimately",
    },
    {
      image_url:
        "https://lh3.googleusercontent.com/a-/ALV-UjU_Vt6kK7zcWvUtDFUI0ZWBEzEucCt5ObtbA98_90R79g=s48-w48-h48",
      name: "Asif Khalid",
      comment: "great extension",
    },
    {
      image_url:
        "https://lh3.googleusercontent.com/a/ACg8ocJEnvmDtGQ1H3zkE7MDKft9yFTUExOkT3S2pCRJiwRT=s48-w48-h48",
      name: "Charles",
      comment:
        "The extension is really a life saver and so far has served me right. It is very easy and faster to create flawless gigs that attract top cream clients.",
    },
    {
      image_url:
        "https://lh3.googleusercontent.com/a/ACg8ocINpEfehPfmnCNe-MxgorJ9sk5Z5Q4eNpkc7RweYs7U=s48-w48-h48",
      name: "Headteacher Gps615tda",
      comment: "Simply superb",
    },
    {
      image_url:
        "https://lh3.googleusercontent.com/a-/ALV-UjWV4raDb3mH4QJEiY3pffwX3WpchIzi0lp2xKkvT7IOn_w=s48-w48-h48",
      name: "MD HAMEEM ISLAM",
      comment: "love this",
    },
    {
      image_url:
        "https://lh3.googleusercontent.com/a-/ALV-UjV37Uhx8VVLpFox8hN367nrHb17pdEMtsUi2H2kotZublc=s48-w48-h48",
      name: "Shaon Rahman",
      comment:
        "Outstanding Experience! Your developers are awesome. Your extension is a real lifesaver for me using Fiverr! It's made my research experience so much more efficient and convenient when creating a new gig. The interface is user-friendly and has quickly become an essential tool for me. I would definitely recommend it to anyone looking to enhance their experience with Fiverr.",
    },
    {
      image_url:
        "https://lh3.googleusercontent.com/a-/ALV-UjVgTLH7DQ1FpR8Y-n1FmR1p-fsbekY2vSb_xqeaouXXa9c=s48-w48-h48",
      name: "Sameer Hassan",
      comment:
        "Fiverr Mate is a Chrome extension that helps you to manage your Fiverr gigs, orders, messages, and reviews. It also provides you with useful insights and tips to improve your performance and earnings on Fiverr. I have been using Fiverr Mate for a few months now, and I must say it has been a game-changer for me. Here are some of the reasons why I love Fiverr Mate and how it helps me to achieve my goals.\n\nFeatures I like most\n\n•  Fiverr Mate Dashboard: This is where I can see all my important s... Show more",
    },
    {
      image_url:
        "https://lh3.googleusercontent.com/a/ACg8ocJYvdc8UOwnHvRx_mC2FtnL8NWFiltjxoqpxp90gqEC=s48-w48-h48",
      name: "Muhammad Nabeel",
      comment: "great thing to boost your business on fiverr",
    },
    {
      image_url:
        "https://lh3.googleusercontent.com/a-/ALV-UjUBgb-yhSbp7pekhx8kwZzNgIDIC8E8tIJmKFQS3T4EwQ=s48-w48-h48",
      name: "Travel Tips with Osama",
      comment:
        "great excellent helpful tool. this tool fiverr mate make very easy to rank on fiverr outstanding",
    },
    {
      image_url:
        "https://lh3.googleusercontent.com/a-/ALV-UjWFYT_Svxgn7MKWx1qsnMauCw2kmi6YHFeRl7oVitrsFPMK=s48-w48-h48",
      name: "Marcelo Fernández Baca dos Santos",
      comment: "Cool extension",
    },
    {
      image_url:
        "https://lh3.googleusercontent.com/a-/ALV-UjWOupZN9lMCr9x9rI5cZUh7mQAcSmSm-rvxmz28L1BNFw=s48-w48-h48",
      name: "Sana Mansha",
      comment: "just superb extension ,helped me a lot",
    },
    {
      image_url:
        "https://lh3.googleusercontent.com/a-/ALV-UjVJM2o_12JqjIWXyn78z_Y5cBqQiL9HufTDmlqWxz_P_gc=s48-w48-h48",
      name: "Ezio _",
      comment: "super",
    },
    {
      image_url:
        "https://lh3.googleusercontent.com/a/ACg8ocLmN_Qbd57iJyAD_Xn26aYzRM1gd21_KRrT6DPwHHqd=s48-w48-h48",
      name: "Laxmi Kulkarni",
      comment: "was very helpful",
    },
    {
      image_url:
        "https://lh3.googleusercontent.com/a-/ALV-UjX-XRUM2_PY3MI9GtG1R_hQh5XRg4ATj__NosWS-WuCcQw=s48-w48-h48",
      name: "Younes Zahiri",
      comment: "good app",
    },
    {
      image_url:
        "https://lh3.googleusercontent.com/a-/ALV-UjXIDjUeSDHpQSw1prAoBp7R6DnOhUJp04rhdNfqR-vziQ=s48-w48-h48",
      name: "Zaheer Abbas",
      comment: "great",
    },
    {
      image_url:
        "https://lh3.googleusercontent.com/a/ACg8ocJQ2Q5mkD5V_shmPiIKn0z-jpi8uFSrEbfLhC50I62k=s48-w48-h48",
      name: "Lulu gaming",
      comment:
        "Fiverr Mate has been a real game-changer for me. Its automation and SEO-optimized content generation have boosted my gig visibility, saving me time and effort. Sure, the interface could be more intuitive and a user guide would be helpful, but overall, it's easy to use and delivers results fast. Compared to other extensions, Fiverr Mate stands out with its Fiverr-focused features",
    },
    {
      image_url:
        "https://lh3.googleusercontent.com/a/ACg8ocJMDsd2uWQFCtcfsPmZ2_2iJzpPlqVk6tOUtGmwLCMJ=s48-w48-h48",
      name: "afaq afzal",
      comment:
        "Anyone who're seeking to rank the fiverr gig, This Chrome extension will do a lot's of stuff. It's straightforward, provides valuable gig ranking insights, and offers powerful keyword research and optimization features. Highly recommended for anyone serious about boosting their Fiverr presence!",
    },
    {
      image_url:
        "https://lh3.googleusercontent.com/a-/ALV-UjXD7GGjdYnhT1wHne1_hoqi4bfY1s9UoJpmgujqS3e7gOh9=s48-w48-h48",
      name: "Armando Rios",
      comment:
        "I optimized my Gig Titles with their methods and I bumped my total impressions to 2000 with 12 Clicks. So far Im really liking this extension to the point that I might drop entirely my Fiverr Seller Plus acct. Highly suggest  to get this extension for those still unsure of how to budget a highly performing SEO for Fiverr optimizing tool",
    },
    {
      image_url:
        "https://lh3.googleusercontent.com/a-/ALV-UjUHrbt4copsZqc2U2IO34grkxtSeSY-_x1bYm7IxCHYRQ=s48-w48-h48",
      name: "Awais Randhawa",
      comment: "awesome",
    },
    {
      image_url:
        "https://lh3.googleusercontent.com/a-/ALV-UjUr8Z1NORWknpgQCfPM4zmfW4LUFcfQJ2cNQI5fQU_RjA=s48-w48-h48",
      name: "Mohammad Nayeem",
      comment: "This extention is helpful and excellent.",
    },
    {
      image_url:
        "https://lh3.googleusercontent.com/a/ACg8ocIN3k5H6DNQAji1n_HFbk63yYSUuTAmdkcKdDnfoXAy=s48-w48-h48",
      name: "fatima bibi",
      comment:
        "I really want to use it to improve my fiverr SEO. Thanks to the team of Syntaximos. They help me a lot how to use it. I am very happy",
    },
    {
      image_url:
        "https://lh3.googleusercontent.com/a/ACg8ocL-McFWMycAFU0054v9HLK5-7tVkDRfFZyMz6lVZL3M=s48-w48-h48",
      name: "Fizzah Ashfaq",
      comment: "looved i",
    },
    {
      image_url:
        "https://lh3.googleusercontent.com/a-/ALV-UjVWdzXOo8XMj5cNP1MfGAYu5cBJu2zYLsP0e2IDgWYL_ZI=s48-w48-h48",
      name: "RAZA ALI AMJAD",
      comment:
        "Wow! This is superb extension. I was looking for such extension for fiverr. Thanks mate. highly recommended",
    },
    {
      image_url:
        "https://lh3.googleusercontent.com/a/ACg8ocLv35PEsFb8C6DteAwAqbFjZzRsc5CgAGimwjZbCkxK=s48-w48-h48",
      name: "Feez shafter",
      comment:
        "Anyone who're seeking to rank the fiverr gig, This Chrome extension will do a lot's of stuff. It's straightforward, provides valuable gig ranking insights, and offers powerful keyword research and optimization features. Highly recommended for anyone serious about boosting their Fiverr presence!",
    },
    {
      image_url:
        "https://lh3.googleusercontent.com/a/ACg8ocIQ6LWjNk-XDtCtzjXDQsIoX0ggex-wBeqlWItmYOiZ=s48-w48-h48",
      name: "Kaiber Knike",
      comment:
        "This Chrome extension is a game-changer for Fiverr SEO! It's user-friendly, provides valuable insights on gig rankings and competition, and offers powerful keyword research and optimization suggestions. It's a must-have for anyone serious about succeeding on Fiverr!",
    },
    {
      image_url:
        "https://lh3.googleusercontent.com/a/ACg8ocIDmnZ2EYA24C7u5pByf11LbeEbzmPox7pBuvK-MbfA=s48-w48-h48",
      name: "Robert Rodriguez",
      comment:
        "I am absolutely thrilled with the Fiverr Mate Chrome extension! It has revolutionized the way I approach Fiverr SEO. This tool is incredibly powerful yet user-friendly. From keyword research to optimizing my gig, it has streamlined the entire process. The analytics feature is an added bonus, providing valuable insights for fine-tuning strategies. If you're serious about excelling on Fiverr, this extension is a game-changer! . Everyone should try this. You don't need to be logged in to your pr... Show more",
    },
    {
      image_url:
        "https://lh3.googleusercontent.com/a/ACg8ocL5GPYnsblSia83q6IV55A_7NZC05OVP6XxdUe39fff=s48-w48-h48",
      name: "LIX KVJ",
      comment:
        "This Fiverr Mate Chrome extension is a game-changer for Fiverr SEO. It simplifies everything from keyword research to on-page optimization. A must-have for Fiverr success! .  Extension is fully working as normal. I don't know why some of said that it's not working.",
    },
    {
      image_url:
        "https://lh3.googleusercontent.com/a/ACg8ocJ8AYzwPVOXXr73-B-VBmDgbFSb9ELuSCkzQxnyvFyt=s48-w48-h48",
      name: "Naishma Faiken",
      comment:
        "No words to say. Your extension is a real lifesaver when it comes to creating gigs on the platform. let me introduce this extension in my word. It simplifies the process by handling bulk tasks and research, allowing you to focus on creating quality content. The interface is intuitive and user-friendly, making it easy to use even for those who aren't particularly tech-savvy. Thanks to the seamless integration into the platform, you'll save time and effort on every gig you create. Highly recomm... Show more",
    },
    {
      image_url:
        "https://lh3.googleusercontent.com/a/ACg8ocJR3HWZFtl56oVTXYCfoVHazNcWA8iAKIuJ7f6mh1Ni=s48-w48-h48",
      name: "Maque Mantos",
      comment:
        "You developers are awesome. Your extension is a real lifesaver for me using fiverr! It's made my researching experience so much more efficient and convenient when creating a new gig. Interface is user-friendly, and has quickly become an essential tool for me. I would definitely recommend it to anyone looking to enhance their experience with fiverr.",
    },
    {
      image_url:
        "https://lh3.googleusercontent.com/a/ACg8ocJRxZYarerWHdJTPJZe_BP-emud6RR_GLJaXSPDj6RG=s48-w48-h48",
      name: "Joseph Kambridge",
      comment:
        "As a freelancer, time is money for me. This extension has helped me save both. The automation features of this extension are fantastic and help me a lot to create a professional gig without researching days. It's so easy to use & no need to login with my private fiverr account to use it. So 100% safe. If you're serious about growing your Fiverr business, this extension is a no-brainer.",
    },
    {
      image_url:
        "https://lh3.googleusercontent.com/a/ACg8ocLXbzxyBE5QeTxKF2zINgURE4iEkskGAo41Urn0-m63=s48-w48-h48",
      name: "pablo",
      comment:
        "Wow! This is superb extension. I was looking for such extension for fiverr. Thanks mate.",
    },
    {
      image_url:
        "https://lh3.googleusercontent.com/a-/ALV-UjVWaZnp6qYMFcbAMekyRXOfqtwsnZKV2qlk9Q_jgWkDAQ=s48-w48-h48",
      name: "Mark Alison Follosco",
      comment: "awesome",
    },
    {
      image_url:
        "https://lh3.googleusercontent.com/a/ACg8ocLtU8xnlJDu1r4JDv5kHdL-1XG7sAGs648pYaUsUytw=s48-w48-h48",
      name: "ty concepts",
      comment: "Impressive. I hope to see more options for ranking",
    },
    {
      image_url:
        "https://lh3.googleusercontent.com/a/ACg8ocIw1mfO6pVlJVLwZ12jgvFGImpYxMoVOboXpAeW5Tvo=s48-w48-h48",
      name: "asad khan",
      comment:
        "Now a moment I didn't use this  extension but write a review to get free one month package",
    },
    {
      image_url:
        "https://lh3.googleusercontent.com/a/ACg8ocJg3pzkiT0Hxspbuv_LJa5OcNYQo3FEHuxmNfCm0qYy=s48-w48-h48",
      name: "Crypto Stellar",
      comment: "Doesn't work, doesn't let you login.",
    },
    {
      image_url:
        "https://lh3.googleusercontent.com/a-/ALV-UjXQBVdIC1nDkU1-2bTxSdPinSzBwC45OFHaPqMgyeqY4A=s48-w48-h48",
      name: "Touhidur Rahman",
      comment: "Fake. It did not authorize and register me.",
    },
    {
      image_url:
        "https://lh3.googleusercontent.com/a/ACg8ocJ8qUBoBPIhRE9A68xqO1SB2p3L25gJYjokUGojoFsc=s48-w48-h48",
      name: "Yasir Arafat",
      comment: "Fake. It did not authorize and register me.",
    },
    {
      image_url:
        "https://lh3.googleusercontent.com/a-/ALV-UjUroeZweb1aQ0E8Y5hFXaFvuQPUFw9TIzUfrfMgJgG5aQ=s48-w48-h48",
      name: "Helicon HRD",
      comment: "Fake. It did not authorize and register me.",
    },
    {
      image_url:
        "https://lh3.googleusercontent.com/a/ACg8ocKeS6KkoTzk6s74zGf741R0JInYvh-M190bCkUXtWBf=s48-w48-h48",
      name: "Yaser Iqbal",
      comment: "Fake. It did not authorize and register me.",
    },
    {
      image_url:
        "https://lh3.googleusercontent.com/a-/ALV-UjVEYykcNfZi0ilqWlw7INbxS-mqeThzU0rmN3pub9G6Fx0=s48-w48-h48",
      name: "Salman Sultan",
      comment: "Fake. It did not authorize and register me.",
    },
  ];
  return (
    <div className="flex flex-col gap-2  w-full min-h-[30vw]">
      <h1 className="text-4xl">Here&apos;s What Our Members Say</h1>
      <label htmlFor="">
        Our members are the most important part of our community. Here&apos;s
        what they have to say about Fiverr Mate
      </label>
      <TestomonialAction
        reviews={reviews}
        extensionreviewurl={extensionreviewurl}
      />
    </div>
  );
}

export default CustomerFeedbackSection;
