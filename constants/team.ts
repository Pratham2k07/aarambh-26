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
    photo: "/chellaboina.jpg",
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
      photo: "/sogani.jpg",
      department: "Office of Student Affairs",
      socials: {
        linkedin: "https://www.linkedin.com/in/deepak-sogani/",
        email: "deepak.sogani@jklu.edu.in"
      }
    },
    {
      name: "Anushka Pathak",
      designation: "Executive - Student Affairs",
      photo: "/anushka.jpg",
      department: "Office of Student Affairs",
      socials: {
        email: "anushkapathak@jklu.edu.in"
      }
    },
    {
      name: "Vaibhav Topiwala",
      designation: "Sports Officer - Student Affairs",
      photo: "/topiwala.png",
      department: "Office of Student Affairs",
      socials: {
        email: "vaibhavtopiwala@jklu.edu.in"
      }
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
      photo: "https://docs.google.com/uc?export=view&id=1u8eymBp9i5d8V5TkBouVEfk-MAn6RV0o",
      socials: {
        linkedin: "https://www.linkedin.com/in/smile-chhabra-15a49830a",
        email: "smilechhabra@jklu.edu.in"
      }
    },
    {
      name: "Pratigya Bomb",
      designation: "Discipline Lead",
      department: "Discipline",
      photo: "https://docs.google.com/uc?export=view&id=1jZQpdcmHp1tQxSp7q3tOlYzAKkxOnvCq",
      socials: {
        linkedin: "https://www.linkedin.com/in/pratigya-bomb-295857349",
        email: "pratigyabomb@jklu.edu.in"
      }
    },
    {
      name: "Vaibhav Khandelwal",
      designation: "Social Media Lead",
      department: "Social Media",
      photo: "https://docs.google.com/uc?export=view&id=1YQIwjbrZLEtw6j3FzAXlPD-Ed0Y1OMuV",
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
      photo: "https://docs.google.com/uc?export=view&id=1aXpnANlcdWUfRYH3htS7EbhBfXdCwHny",
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
      photo: "https://docs.google.com/uc?export=view&id=1dqMMlRNL05uVl9beQiuZ2PT_F1XBULsT",
      socials: {
        linkedin: "https://www.linkedin.com/in/devam-gupta/",
        email: "devamgupta@jklu.edu.in",
        instagram: "https://www.instagram.com/who.is.devam/",
        github: "https://github.com/Devam759"
      }
    },
    {
      name: "Varra Srivalli",
      designation: "Cluster Head",
      department: "Cluster Head",
      photo: "https://docs.google.com/uc?export=view&id=1xaYj-8NAXN86SLBANmBlIwR7sip85AdX",
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
      photo: "https://docs.google.com/uc?export=view&id=1dt0VN_pVUuTUIuYphhv3Gt6eTJNhkzdK",
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
      photo: "https://docs.google.com/uc?export=view&id=13-JMM7hw60OHJq_hUchGJeYdhOwqv9ec",
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
      photo: "https://docs.google.com/uc?export=view&id=1hOcqabKjKA6Iwal8auDP47GVIYe4YJtz",
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
      photo: "https://docs.google.com/uc?export=view&id=1WeFZElT4IQZNLurYnSLsCOLeL09frUQK",
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
      photo: "https://docs.google.com/uc?export=view&id=1i-EYWu40OcrPQbDfBh-u4zcRcBvvCUFH",
      socials: {
        linkedin: "https://www.linkedin.com/in/shlok-chaturvedi",
        email: "shlokchaturvedi@jklu.edu.in"
      }
    },
    {
      name: "Rishika Sharma",
      designation: "Cluster Head",
      department: "Cluster Head",
      photo: "https://docs.google.com/uc?export=view&id=1vacP8qUzWGGgx6NGH3F_lBzblKzeo9rS",
      socials: {
        linkedin: "https://www.linkedin.com/in/rishika-sharma-3b2168336",
        email: "rishikasharma@jklu.edu.in"
      }
    },
    {
      name: "Doddapuneni Jahanavi",
      designation: "Cluster Head",
      department: "Cluster Head",
      photo: "https://docs.google.com/uc?export=view&id=1MiOaxp-Qg1jr-GyNxky8WBgtjllt1vPy",
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
      photo: "https://docs.google.com/uc?export=view&id=1wd8tvVWBppHx-vptLr-xs5jaWaEaOT-f",
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
      photo: "https://docs.google.com/uc?export=view&id=1VmMQsdcDgOo-0O7V2oYRR1IWvIe-s_Rw",
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
      photo: "https://docs.google.com/uc?export=view&id=190n3RxS7qENARqQJGctEj1POW1y05PrG",
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
      photo: "https://docs.google.com/uc?export=view&id=1lzUY2VW3Ge-vnIeD2LfHA-oEunewlppJ",
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
      photo: "https://docs.google.com/uc?export=view&id=1vl2eiFBw-i3q4k6pQKORcdq5Ifx3TjIH",
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
      photo: "https://docs.google.com/uc?export=view&id=1ShnkjaGaBbO8sD6mPlakzx_HQUaDJpYi",
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
      photo: "https://docs.google.com/uc?export=view&id=1Rw_ypo86jVIgEwYU0u0-OvB4ZI6GmwRP",
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
      photo: "https://docs.google.com/uc?export=view&id=1RYOtcmTSp9ImNceLiBNGu0HvohSRFw55",
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
      photo: "https://docs.google.com/uc?export=view&id=1IP7JjH5cfPmZAcw0TGpjAJscdMRYT8IO",
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
      photo: "https://docs.google.com/uc?export=view&id=1qQX5b6nCI4bcNaVSEYgHd50FGXMPFMIe",
      socials: {
        email: "mohitkhurana@jklu.edu.in",
        instagram: "https://www.instagram.com/framing_emotions_"
      }
    },
    {
      name: "Adityavardhan Singh Chauhan",
      designation: "Media Lead",
      department: "Media",
      photo: "https://docs.google.com/uc?export=view&id=1gyQymuytFrz0BpNGOz7iJ02i1aBE_OD8",
      socials: {
        linkedin: "https://www.linkedin.com/in/adityavardhan-singh-work",
        email: "adityavardhansinghchauhan@jklu.edu.in"
      }
    },
    {
      name: "Roshan Jangir",
      designation: "Photography Lead",
      department: "Photography",
      photo: "https://docs.google.com/uc?export=view&id=1_sYWNSydDOGumUnF3QZE8LKEWq5BGLyr",
      socials: {
        linkedin: "https://www.linkedin.com/in/roshan-jangir-a614a430a",
        email: "roshanjangir@jklu.edu.in"
      }
    },
    {
      name: "Pulkit Dosi",
      designation: "Feedback & Registration Lead",
      department: "Feedback & Registration",
      photo: "https://docs.google.com/uc?export=view&id=1eibkXxRk7qIoO0Utuhdzh8tweeMgXVf0",
      socials: {
        linkedin: "https://www.linkedin.com/in/pulkit-dosi-9b5810350",
        email: "pulkitdosi@jklu.edi.in"
      }
    },
    {
      name: "Kandela Nandini",
      designation: "Cluster Head",
      department: "Cluster Head",
      photo: "https://docs.google.com/uc?export=view&id=18Kngtw3FD2yYv6DRwP9FQ6Cc29izRjrp",
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
      photo: "https://docs.google.com/uc?export=view&id=1rVB2fYR88V2Z-0w22DLe2Os4bWq38Wnf",
      socials: {
        linkedin: "https://www.linkedin.com/in/jheel-jain-a14913357",
        email: "jheeljain@jklu.edu.in"
      }
    },
    {
      name: "Chestha Kulshrestha",
      designation: "Media Lead",
      department: "Media",
      photo: "https://docs.google.com/uc?export=view&id=1oEx6i3JC0gJic1LFoQuus31y2VB-RczK",
      socials: {
        linkedin: "https://www.linkedin.com/in/chestha-kulshrestha11",
        email: "chesthakulshrestha@jklu.edu.in"
      }
    },
    {
      name: "Vidhi Chamaria",
      designation: "Cluster Head",
      department: "Cluster Head",
      photo: "https://docs.google.com/uc?export=view&id=1UvXWjmcQOLQY36K6YQ_VBHaeTy7otMUm",
      socials: {
        linkedin: "https://www.linkedin.com/in/vidhi-chamaria-a1b301404",
        email: "vidhichamaria@jklu.edu.in"
      }
    },
    {
      name: "Bhavya Bang",
      designation: "Cluster Head",
      department: "Cluster Head",
      photo: "https://docs.google.com/uc?export=view&id=1GOBdwulPNgKJC4l9WU2mnNNrRQ8QVBWP",
      socials: {
        linkedin: "https://www.linkedin.com/in/bhavya-bang",
        email: "bhavya@jklu.edu.in"
      }
    }
  ] as TeamMember[]
};
