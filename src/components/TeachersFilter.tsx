'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Teacher {
  id: number;
  name: string;
  subject: string;
  image: string;
  description: string;
}

const teachers: Teacher[] = [
  {
    id: 1,
    name: "Adam Muttaqien, M.Si",
    subject: "Matematika",
    image: "/guru/Adam-Muttaqien-M.Si_.jpg",
    description: "Guru berpengalaman dalam mengajar matematika dengan metode pembelajaran yang inovatif."
  },
  {
    id: 2,
    name: "Annisa Mayasari, S.Pd",
    subject: "Bahasa Indonesia",
    image: "/guru/Annisa-Mayasari-S.Pd_.jpg",
    description: "Mengajar dengan pendekatan komunikatif untuk meningkatkan kemampuan berbahasa siswa."
  },
  {
    id: 3,
    name: "Cindy Trisnawati, S.Pd, M.Pd",
    subject: "Bahasa Inggris",
    image: "/guru/Cindy-Trisnawati-S.Pd-M.Pd_.jpg",
    description: "Spesialis dalam pengajaran bahasa Inggris dengan metode interaktif dan menyenangkan."
  },
  {
    id: 4,
    name: "Devy Estu Anna Putri, S.T, M.Pd",
    subject: "Informatika",
    image: "/guru/Devy-Estu-Anna-Putri-S.T.-M.Pd_-300x400.jpg",
    description: "Ahli dalam teknologi informasi dan pengajaran komputer untuk generasi digital."
  },
  {
    id: 5,
    name: "Heri Septian Munggaran, S.Pd",
    subject: "IPA (Fisika)",
    image: "/guru/Heri-Septian-Munggaran-S.Pd_-300x400.jpg",
    description: "Mengajar IPA dengan pendekatan eksperimen untuk pemahaman konsep yang mendalam."
  },
  {
    id: 6,
    name: "Ade Nugraha, S.Sn",
    subject: "Seni Budaya",
    image: "/guru/Ade-Nugraha-S.Sn_.jpg",
    description: "Mengembangkan kreativitas siswa melalui pembelajaran seni dan budaya Indonesia."
  },
  {
    id: 7,
    name: "Ardiansyah Pratama Putra, S.Sn",
    subject: "Pendidikan Jasmani",
    image: "/guru/Ardiansyah-Pratama-Putra-S.Sn_.jpg",
    description: "Membina kesehatan dan kebugaran siswa melalui olahraga dan aktivitas fisik."
  },
  {
    id: 8,
    name: "Bakhtiar Fahmi, S.Sn",
    subject: "IPS (Sejarah)",
    image: "/guru/Bakhtiar-Fahmi-S.Sn_.jpg",
    description: "Mengajar sejarah dan ilmu sosial dengan pendekatan naratif yang menarik."
  }
];

const subjects = [
  "Semua Guru",
  "Matematika",
  "Bahasa Indonesia",
  "Bahasa Inggris",
  "Informatika",
  "IPA (Fisika)",
  "Seni Budaya",
  "Pendidikan Jasmani",
  "IPS (Sejarah)"
];

export default function TeachersFilter() {
  const [selectedSubject, setSelectedSubject] = useState("Semua Guru");

  const filteredTeachers = selectedSubject === "Semua Guru" 
    ? teachers 
    : teachers.filter(teacher => teacher.subject === selectedSubject);

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Navigation Sidebar */}
      <div className="lg:w-1/4">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 sticky top-24 border border-gray-200 shadow-lg">
          <h3 className="text-base sm:text-lg font-ubuntu font-semibold text-gray-800 mb-3 sm:mb-4">
            Filter Mata Pelajaran
          </h3>
          <div className="space-y-1 sm:space-y-2">
            {subjects.map((subject) => (
              <button
                key={subject}
                onClick={() => setSelectedSubject(subject)}
                className={`w-full text-left px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-sm sm:text-base font-medium transition-all duration-200 ${
                  selectedSubject === subject
                    ? "bg-blue-600 text-white shadow-md"
                    : "text-gray-700 hover:bg-white hover:shadow-md border border-transparent hover:border-gray-200"
                }`}
              >
                {subject}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Teachers Content */}
      <div className="lg:w-3/4">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedSubject}
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 30,
              duration: 0.3
            }}
            className="grid grid-cols-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-4 lg:gap-6"
          >
            {filteredTeachers.map((teacher, index) => (
              <motion.div
                key={teacher.id}
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ 
                  delay: index * 0.1,
                  type: "spring", 
                  stiffness: 300, 
                  damping: 30
                }}
                className="bg-white/90 backdrop-blur-sm rounded-lg sm:rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl hover:scale-105 transition-all duration-300 max-w-32 sm:max-w-xs mx-auto"
               >
                 <div className="h-24 sm:h-32 md:h-40 lg:h-48 overflow-hidden">
                   <img 
                     src={teacher.image}
                     alt={teacher.name}
                     className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                   />
                 </div>
                 <div className="p-2 sm:p-3 md:p-4 lg:p-5">
                  <h3 className="text-xs sm:text-sm md:text-base lg:text-lg font-ubuntu font-semibold text-gray-800 mb-0.5 sm:mb-1 md:mb-2">
                      {teacher.name}
                    </h3>
                    <p className="text-blue-600 font-medium mb-0.5 sm:mb-1 md:mb-2 text-xs sm:text-sm md:text-base">{teacher.subject}</p>
                    <p className="text-gray-600 text-xs sm:text-sm leading-relaxed hidden sm:block">
                      {teacher.description}
                    </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
        
        {/* No Results Message */}
        {filteredTeachers.length === 0 && (
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 30,
              duration: 0.3
            }}
            className="text-center py-12"
          >
            <div className="text-gray-500 text-lg mb-2">
              Tidak ada guru untuk mata pelajaran ini
            </div>
            <p className="text-gray-400 text-sm">
              Silakan pilih mata pelajaran lain dari menu di sebelah kiri
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}