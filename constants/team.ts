export interface TeamMember {
  name: string;
  designation: string;
  photo?: string;
  department?: string;
  socials?: {
    linkedin?: string;
    email?: string;
    twitter?: string;
    instagram?: string;
    github?: string;
  };
}

export const TEAM_DATA = {
  vc: {
    name: "Vijaya Sekhar Chellaboina",
    designation: "Vice Chancellor",
    photo: "/Team Photos/Admin and Student Affairs/VC Sir.jpg",
    department: "Administration",
    socials: {
      linkedin: "https://www.linkedin.com/in/vchellaboina/",
      email: "vc@jklu.edu.in"
    }
  } as TeamMember,
  
  osa: [
    {
      name: "Deepak Sogani",
      designation: "Head - Student Affairs",
      photo: "/Team Photos/Admin and Student Affairs/Deepak Sogani.jpg",
      department: "Office of Student Affairs",
      socials: {
        linkedin: "https://www.linkedin.com/in/deepak-sogani/",
        email: "deepak.sogani@jklu.edu.in"
      }
    },
    {
      name: "Anushka Pathak",
      designation: "Executive - Student Affairs",
      photo: "/Team Photos/Admin and Student Affairs/Anushka Pathak.jpg",
      department: "Office of Student Affairs",
      socials: {}
    },
    {
      name: "Vaibhav Topiwala",
      designation: "Sports Officer - Student Affairs",
      photo: "/Team Photos/Admin and Student Affairs/Vaibhav Topiwala.png",
      department: "Office of Student Affairs",
      socials: {}
    },
    {
      name: "Mr. Gajendra",
      designation: "Sr. Sports Officer - Student Affairs",
      photo: "/Team Photos/Admin and Student Affairs/Mr. Gajendra.jpeg",
      department: "Office of Student Affairs",
      socials: {}
    },
    {
      name: "Rajesh Joshi",
      designation: "Office Assistant - Student Affairs",
      photo: "/Team Photos/Admin and Student Affairs/Rajesh Joshi.jpg",
      department: "Office of Student Affairs",
      socials: {}
    }
  ] as TeamMember[],

  organizingHeads: [
    {
      name: "Vedika Agrawal",
      designation: "Organizing Head",
      photo: "",
      department: "Core Organizing Committee",
      socials: {
        email: "vedikaagrawal@jklu.edu.in"
      }
    },
    {
      name: "Aman Pratap Singh",
      designation: "Organizing Head",
      photo: "",
      department: "Core Organizing Committee",
      socials: {
        email: "amanpratapsingh@jklu.edu.in"
      }
    },
    {
      name: "Vaishnavi Shukla",
      designation: "Organizing Head",
      photo: "",
      department: "Core Organizing Committee",
      socials: {
        email: "vaishnavishukla@jklu.edu.in"
      }
    },
    {
      name: "Tanik Gupta",
      designation: "Organizing Head",
      photo: "",
      department: "Core Organizing Committee",
      socials: {
        email: "tanikgupta@jklu.edu.in"
      }
    },
    {
      name: "Ambika Dalmia",
      designation: "Organizing Head",
      photo: "",
      department: "Core Organizing Committee",
      socials: {
        email: "ambikadalmia@jklu.edu.in"
      }
    }
  ] as TeamMember[],

  teamLeaders: [
    {
      name: "Smile Chhabra",
      designation: "Food & Accommodation Lead",
      department: "Food & Accommodation",
      photo: "/Team Photos/Team Leaders/Smile Chhabra.webp",
      socials: {
        linkedin: "https://www.linkedin.com/in/smile-chhabra-15a49830a",
        email: "smilechhabra@jklu.edu.in"
      }
    },
    {
      name: "Pratigya Bomb",
      designation: "Discipline Lead",
      department: "Discipline",
      photo: "/Team Photos/Team Leaders/Pratigya Bomb.webp",
      socials: {
        linkedin: "https://www.linkedin.com/in/pratigya-bomb-295857349",
        email: "pratigyabomb@jklu.edu.in"
      }
    },
    {
      name: "Vaibhav Khandelwal",
      designation: "Social Media Lead",
      department: "Social Media",
      photo: "/Team Photos/Team Leaders/Vaibhav Khandelwal.webp",
      socials: {
        linkedin: "https://www.linkedin.com/in/vaibhav-khandelwal-001831338",
        email: "vaibhavkhandelwal@jklu.edu.in",
        instagram: "https://www.instagram.com/vaibhav.khandelwal._"
      }
    },
    {
      name: "Naman Shukla",
      designation: "Internal Arrangements Lead",
      department: "Internal Arrangements",
      photo: "/Team Photos/Team Leaders/naman shukla.webp",
      socials: {
        linkedin: "https://www.linkedin.com/in/naman-shukla-87ba40325",
        email: "namanshukla@jklu.edu.in",
        instagram: "https://www.instagram.com/heyyynaman"
      }
    },
    {
      name: "Devam Gupta",
      designation: "Technical Lead",
      department: "Technical",
      photo: "/Team Photos/Team Leaders/Devam Gupta.webp",
      socials: {
        linkedin: "https://www.linkedin.com/in/devam-gupta/",
        email: "devamgupta@jklu.edu.in",
        instagram: "https://www.instagram.com/who.is.devam/",
        github: "https://github.com/Devam759"
      }
    },
    {
      name: "Yash Bansal",
      designation: "Technical Lead",
      department: "Technical",
      photo: undefined,
      socials: {}
    },
    {
      name: "Varra Srivalli",
      designation: "Cluster Head",
      department: "Cluster Head",
      photo: "/Team Photos/Cluster Heads/Varra Srivallika.webp",
      socials: {
        linkedin: "https://www.linkedin.com/in/varrasrivalli",
        email: "Varrasrivalli@jklu.edu.in",
        instagram: "https://www.instagram.com/varra_srivallika_reddy",
        github: "https://github.com/varrasrivallikareddy"
      }
    },
    {
      name: "Mayank Gautam",
      designation: "Internal Arrangements Lead",
      department: "Internal Arrangements",
      photo: "/Team Photos/Team Leaders/Mayank Gautam.webp",
      socials: {
        linkedin: "https://www.linkedin.com/in/mayank-gautam29",
        email: "mayank@jklu.edu.in",
        instagram: "https://www.instagram.com/mayankk.gtm",
        github: "https://github.com/mayankgautam29"
      }
    },
    {
      name: "Khushi Soni",
      designation: "Cluster Head",
      department: "Cluster Head",
      photo: "/Team Photos/Cluster Heads/Khushi Soni.webp",
      socials: {
        linkedin: "https://www.linkedin.com/in/khushi-soni--ks0906",
        email: "khushisoni@jklu.edu.in",
        instagram: "https://www.instagram.com/khushiii_06_09"
      }
    },
    {
      name: "Rishika Singh",
      designation: "Cluster Head",
      department: "Cluster Head",
      photo: "/Team Photos/Cluster Heads/Rishika Singh.webp",
      socials: {
        linkedin: "https://www.linkedin.com/in/rishika-singh19/",
        email: "rishikasingh2024@jklu.edu.in",
        instagram: "https://www.instagram.com/rishikaksngh"
      }
    },
    {
      name: "Vankayala Pavani",
      designation: "Cluster Head",
      department: "Cluster Head",
      photo: "/Team Photos/Cluster Heads/Pavani Vankayala.webp",
      socials: {
        linkedin: "https://www.linkedin.com/in/vankayalapavani",
        email: "vankayalapavani@jklu.edu.in",
        instagram: "https://www.instagram.com/_pavani_916"
      }
    },
    {
      name: "Shlok Chaturvedi",
      designation: "Cluster Head",
      department: "Cluster Head",
      photo: "/Team Photos/Team Leaders/Shlok Chaturvedi.webp",
      socials: {
        linkedin: "https://www.linkedin.com/in/shlok-chaturvedi",
        email: "shlokchaturvedi@jklu.edu.in"
      }
    },
    {
      name: "Rishika Sharma",
      designation: "Cluster Head",
      department: "Cluster Head",
      photo: "/Team Photos/Cluster Heads/Rishika Sharma.webp",
      socials: {
        linkedin: "https://www.linkedin.com/in/rishika-sharma-3b2168336",
        email: "rishikasharma@jklu.edu.in"
      }
    },
    {
      name: "Doddapuneni Jahanavi",
      designation: "Cluster Head",
      department: "Cluster Head",
      photo: "/Team Photos/Cluster Heads/Jahnavi chowdary.webp",
      socials: {
        linkedin: "https://www.linkedin.com/in/doddapuneni-jahanavi",
        email: "doddapunenijahanavi@jklu.edu.in",
        instagram: "https://www.instagram.com/jahnavi_chowdhary183",
        github: "https://github.com/jahnavichowdary15"
      }
    },
    {
      name: "Aditya Nayak",
      designation: "Social Media Lead",
      department: "Social Media",
      photo: "/Team Photos/Team Leaders/Aditya Nayak .webp",
      socials: {
        linkedin: "https://www.linkedin.com/in/aditya-nayak-a008b43b5/",
        email: "adityanayak@jklu.edu.in",
        instagram: "https://www.instagram.com/_nayak_1913"
      }
    },
    {
      name: "Kartik Sharma",
      designation: "Discipline Lead",
      department: "Discipline",
      photo: "/Team Photos/Team Leaders/Kartik Sharma.webp",
      socials: {
        linkedin: "https://www.linkedin.com/in/kartik-sharma-ks12",
        email: "kartiksharma2024@jklu.edu.in",
        instagram: "https://www.instagram.com/idk_idc.06"
      }
    },
    {
      name: "Medha Gupta",
      designation: "Design Lead",
      department: "Design",
      photo: "/Team Photos/Team Leaders/Medha Gupta.webp",
      socials: {
        linkedin: "https://www.linkedin.com/in/medhaguptadesign/",
        email: "medhagupta@jklu.edu.in",
        instagram: "https://www.instagram.com/07_medha_09/"
      }
    },
    {
      name: "Swadha Saxena",
      designation: "Cluster Head",
      department: "Cluster Head",
      photo: "/Team Photos/Cluster Heads/swadha.webp",
      socials: {
        linkedin: "https://www.linkedin.com/in/swadha-saxena-24b365363",
        email: "swadhasaxena@jklu.edu.in",
        instagram: "https://www.instagram.com/istg.swadhaa__"
      }
    },
    {
      name: "Gourang Tak",
      designation: "Cluster Head",
      department: "Cluster Head",
      photo: "/Team Photos/Team Leaders/Gourang Tak.webp",
      socials: {
        linkedin: "https://www.linkedin.com/in/gourang-tak-153489353",
        email: "gaurang@jklu.edu.in",
        instagram: "https://www.instagram.com/gourang_tak",
        github: "https://github.com/GT-2011"
      }
    },
    {
      name: "Arjun Singh Tanwar",
      designation: "Food & Accommodation Lead",
      department: "Food & Accommodation",
      photo: "/Team Photos/Team Leaders/Arjun Singh Tanwar.webp",
      socials: {
        linkedin: "https://www.linkedin.com/in/arjun-singh-tanwar-28348a353",
        email: "arjunsinghtanwar@jklu.edu.in",
        instagram: "https://www.instagram.com/_arjunsinghtanwar.10"
      }
    },
    {
      name: "Kartavya Garhwal",
      designation: "Food & Accommodation Lead",
      department: "Food & Accommodation",
      photo: "/Team Photos/Team Leaders/Kartavya Garhwal.webp",
      socials: {
        linkedin: "https://www.linkedin.com/in/kartavya-garhwal-developer/",
        email: "kartavyagarhwal@jklu.edu.in",
        instagram: "https://www.instagram.com/kartavyagarhwal"
      }
    },
    {
      name: "Aryan Gupta",
      designation: "Cluster Head",
      department: "Cluster Head",
      photo: "/Team Photos/Cluster Heads/Aryan.webp",
      socials: {
        linkedin: "https://www.linkedin.com/in/aryan-gupta-30dec2006",
        email: "aryangupta2024@jklu.edu.in",
        instagram: "https://www.instagram.com/itz_aryan_30"
      }
    },
    {
      name: "Daksh Kumar",
      designation: "Cluster Head",
      department: "Cluster Head",
      photo: "/Team Photos/Cluster Heads/Daksh Kumar.webp",
      socials: {
        linkedin: "https://www.linkedin.com/in/dakshkkumar",
        email: "dakshkumar@jklu.edu.in",
        instagram: "https://www.instagram.com/dakshkkumar",
        github: "https://github.com/dakshkkumar"
      }
    },
    {
      name: "Mohit Khurana",
      designation: "Photography Lead",
      department: "Photography",
      photo: "/Team Photos/Team Leaders/Mohit Khurana.webp",
      socials: {
        email: "mohitkhurana@jklu.edu.in",
        instagram: "https://www.instagram.com/framing_emotions_"
      }
    },
    {
      name: "Adityavardhan Singh Chauhan",
      designation: "Media Lead",
      department: "Media",
      photo: "/Team Photos/Team Leaders/Adityavardhan Singh.webp",
      socials: {
        linkedin: "https://www.linkedin.com/in/adityavardhan-singh-work",
        email: "adityavardhansinghchauhan@jklu.edu.in"
      }
    },
    {
      name: "Roshan Jangir",
      designation: "Photography Lead",
      department: "Photography",
      photo: "/Team Photos/Team Leaders/Roshan.webp",
      socials: {
        linkedin: "https://www.linkedin.com/in/roshan-jangir-a614a430a",
        email: "roshanjangir@jklu.edu.in"
      }
    },
    {
      name: "Pulkit Dosi",
      designation: "Feedback & Registration Lead",
      department: "Feedback & Registration",
      photo: "/Team Photos/Team Leaders/Pulkit Dosi.webp",
      socials: {
        linkedin: "https://www.linkedin.com/in/pulkit-dosi-9b5810350",
        email: "pulkitdosi@jklu.edi.in"
      }
    },
    {
      name: "Kandela Nandini",
      designation: "Cluster Head",
      department: "Cluster Head",
      photo: "/Team Photos/Cluster Heads/Nandini Kandela.webp",
      socials: {
        linkedin: "https://www.linkedin.com/in/nandini-kandela-cse/",
        email: "kandelanandini@jklu.edu.in",
        instagram: "https://www.instagram.com/dang.erousgirl2024/",
        github: "https://github.com/Nandini-Kandela/"
      }
    },
    {
      name: "Jheel Jain",
      designation: "Cluster Head",
      department: "Cluster Head",
      photo: "/Team Photos/Team Leaders/Jheel Jain.webp",
      socials: {
        linkedin: "https://www.linkedin.com/in/jheel-jain-a14913357",
        email: "jheeljain@jklu.edu.in"
      }
    },
    {
      name: "Chestha Kulshrestha",
      designation: "Media Lead",
      department: "Media",
      photo: "/Team Photos/Team Leaders/chestha.webp",
      socials: {
        linkedin: "https://www.linkedin.com/in/chestha-kulshrestha11",
        email: "chesthakulshrestha@jklu.edu.in"
      }
    },
    {
      name: "Vidhi Chamaria",
      designation: "Cluster Head",
      department: "Cluster Head",
      photo: "/Team Photos/Cluster Heads/Vidhi Chamaria.webp",
      socials: {
        linkedin: "https://www.linkedin.com/in/vidhi-chamaria-a1b301404",
        email: "vidhichamaria@jklu.edu.in"
      }
    },
    {
      name: "Bhavya Bang",
      designation: "Cluster Head",
      department: "Cluster Head",
      photo: "/Team Photos/Cluster Heads/Bhavya.webp",
      socials: {
        linkedin: "https://www.linkedin.com/in/bhavya-bang",
        email: "bhavya@jklu.edu.in"
      }
    }
  ] as TeamMember[]
};
