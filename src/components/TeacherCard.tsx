import { type TeacherDisplay } from '@/services/teacherService'
import { motion } from 'framer-motion'

interface TeacherCardProps {
  teacher: TeacherDisplay
  index: number
}

export const TeacherCard = ({ teacher, index }: TeacherCardProps) => {
  // Animation variants
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.2,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  }

  const imageVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      rotateY: -15
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      rotateY: 0,
      transition: {
        duration: 0.8,
        delay: index * 0.2 + 0.3,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  }

  const textVariants = {
    hidden: { 
      opacity: 0, 
      x: index % 2 === 0 ? -30 : 30
    },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.2 + 0.4,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  }

  const lineVariants = {
    hidden: { 
      opacity: 0, 
      scaleX: 0
    },
    visible: { 
      opacity: 1, 
      scaleX: 1,
      transition: {
        duration: 0.8,
        delay: index * 0.2 + 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  }

  return (
    <motion.section 
      id={`photo-and-description-${index}`} 
      className="relative lg:h-[554px] h-auto bg-white shadow-lg rounded-lg overflow-hidden" 
      style={{fontFamily: 'Ubuntu, sans-serif'}}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50 opacity-30"></div>
      
      {/* Islamic Pattern Overlay */}
      <img 
        draggable={false} 
        alt="banner" 
        src="https://www.ums.ac.id/__image__/uploads/KZ4tligbcEdhZFxCLan8FNQMirVQuIYtCOMHLOqd.svg" 
        className="w-full absolute inset-0 object-cover h-full opacity-50" 
      />
      
      <div className="relative lg:absolute top-0 w-full h-full flex">
        <div className="w-full lg:relative mt-auto">
          <div className="flex justify-center mx-0 mt-3 lg:mt-5 px-4">
            
            {/* Mobile Layout */}
            <div className="w-full lg:hidden flex flex-col items-center text-center py-16" style={{fontFamily: 'Ubuntu, sans-serif'}}>
              <motion.div 
                className="mb-6"
                variants={imageVariants}
              >
                <img 
                  draggable={false} 
                  alt={`${teacher.name} image`} 
                  src={teacher.image} 
                  className="rounded-full bg-gray-300 mx-auto" 
                  style={{width: '35vw', height: '35vw', objectFit: 'cover'}} 
                />
              </motion.div>
              
              <motion.div 
                className="px-4 text-left"
                variants={textVariants}
              >
                <h4 className="text-sm mb-2 text-black" style={{fontFamily: 'Ubuntu, sans-serif'}}>
                  {teacher.position}
                </h4>
                
                <h3 className="mb-2 font-bold text-black" style={{fontFamily: 'Ubuntu, sans-serif', fontSize: '28px'}}>
                  {teacher.name}
                </h3>
                
                <motion.div 
                  className="flex mb-3"
                  variants={lineVariants}
                >
                  <span className="w-20 h-1 bg-green-600 rounded-full shadow-sm origin-left"></span>
                </motion.div>
                
                <p className="font-semibold text-sm font-regular mb-4 text-black" style={{fontFamily: 'Quicksand, sans-serif'}}>
                  {teacher.description}
                </p>
              </motion.div>
            </div>
            
            {/* Desktop Layout - Alternating left/right */}
            <div className="hidden lg:flex w-full max-w-6xl mx-auto">
              {index % 2 === 0 ? (
                // Layout: Text left, Image right
                <>
                  <motion.div 
                    className="w-7/12 pt-5 text-left flex items-center relative z-30" 
                    style={{marginBottom: '10rem', fontFamily: 'Ubuntu, sans-serif'}}
                    variants={textVariants}
                  >
                    <div className="relative z-40">
                      <h4 className="text-lg font-medium text-black mb-2" style={{fontFamily: 'Ubuntu, sans-serif'}}>
                        {teacher.position}
                      </h4>
                      
                      <h3 className="mb-2 text-3xl lg:text-4xl font-bold text-black" style={{fontFamily: 'Ubuntu, sans-serif'}}>
                        {teacher.name}
                      </h3>
                      
                      <motion.div 
                        className="flex justify-start mb-3 relative z-50"
                        variants={lineVariants}
                      >
                        <span className="w-24 h-1.5 bg-green-600 rounded-full shadow-sm origin-left"></span>
                      </motion.div>
                      
                      <p className="font-bold text-lg font-semibold text-black mb-4" style={{fontFamily: 'Quicksand, sans-serif'}}>
                        {teacher.description}
                      </p>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="w-5/12 flex items-end justify-center relative z-10"
                    variants={imageVariants}
                  >
                    <img 
                      draggable={false} 
                      alt={`${teacher.name} image`} 
                      src={teacher.image} 
                      className="max-w-md h-auto object-cover" 
                      style={{maxHeight: '700px', width: 'auto'}} 
                    />
                  </motion.div>
                </>
              ) : (
                // Layout: Image left, Text right
                <>
                  <motion.div 
                    className="w-5/12 flex items-end justify-center relative z-10"
                    variants={imageVariants}
                  >
                    <img 
                      draggable={false} 
                      alt={`${teacher.name} image`} 
                      src={teacher.image} 
                      className="max-w-md h-auto object-cover" 
                      style={{maxHeight: '700px', width: 'auto'}} 
                    />
                  </motion.div>
                  
                  <motion.div 
                    className="w-7/12 pt-5 text-left flex items-center relative z-30" 
                    style={{marginBottom: '10rem', fontFamily: 'Ubuntu, sans-serif'}}
                    variants={textVariants}
                  >
                    <div className="relative z-40">
                      <h4 className="text-lg font-medium text-black mb-2" style={{fontFamily: 'Ubuntu, sans-serif'}}>
                        {teacher.position}
                      </h4>
                      
                      <h3 className="mb-2 text-3xl lg:text-4xl font-bold text-black" style={{fontFamily: 'Ubuntu, sans-serif'}}>
                        {teacher.name}
                      </h3>
                      
                      <motion.div 
                        className="flex justify-start mb-3 relative z-50"
                        variants={lineVariants}
                      >
                        <span className="w-24 h-1.5 bg-green-600 rounded-full shadow-sm origin-left"></span>
                      </motion.div>
                      
                      <p className="font-bold text-lg font-semibold text-black mb-4" style={{fontFamily: 'Quicksand, sans-serif'}}>
                        {teacher.description}
                      </p>
                    </div>
                  </motion.div>
                </>
              )}
            </div>
          </div>
          
          {/* Footer - z-index rendah agar di belakang foto */}
          <div className="w-full h-16 bg-green-600 flex justify-center absolute bottom-0 mx-0 z-0">
            <div className="hidden lg:block lg:w-5/12"></div>
            <div className="w-full lg:w-7/12 text-sm font-bold text-white py-3 text-right flex items-center justify-end pr-4" style={{fontFamily: 'Ubuntu, sans-serif'}}>
              {/* Footer content dapat ditambahkan di sini */}
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  )
} 