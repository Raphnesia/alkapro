# Animasi Halaman Guru - Setup & Dokumentasi

## 🎬 Overview

Halaman guru telah dilengkapi dengan animasi reveal yang modern dan menarik menggunakan Framer Motion. Animasi ini memberikan pengalaman pengguna yang lebih baik dan membuat halaman terlihat lebih profesional.

## ✨ Fitur Animasi yang Ditambahkan

### 1. **TeacherCard Animations**
- **Card Reveal**: Setiap card guru muncul dengan animasi fade-in dan slide-up
- **Image Animation**: Foto guru muncul dengan efek scale dan rotate
- **Text Animation**: Teks muncul dengan slide dari kiri/kanan sesuai layout
- **Staggered Animation**: Setiap card muncul secara berurutan dengan delay

### 2. **Subject Navigation Animations**
- **Button Reveal**: Tombol mata pelajaran muncul satu per satu
- **Hover Effects**: Scale dan shadow saat hover
- **Active State**: Animasi smooth saat pergantian mata pelajaran aktif

### 3. **Loading & Error States**
- **Loading Spinner**: Animasi fade-in dan rotate untuk spinner
- **Error Message**: Animasi shake dan fade-in untuk pesan error
- **Retry Button**: Hover dan tap animations

### 4. **Empty State Animations**
- **Container**: Scale dan fade-in untuk container
- **Icon**: Bounce animation untuk emoji
- **Text Elements**: Staggered text reveal
- **Button**: Hover dan tap effects

## 🎯 Komponen Animasi

### TeacherCard Component

```typescript
// Animation variants
const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 50,
    scale: 0.95
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
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
```

### Subject Navigation

```typescript
<motion.button
  initial={{ opacity: 0, y: 20, scale: 0.9 }}
  whileInView={{ opacity: 1, y: 0, scale: 1 }}
  transition={{ 
    duration: 0.5, 
    delay: 0.3 + index * 0.1,
    ease: [0.25, 0.46, 0.45, 0.94]
  }}
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
  {subject.name}
</motion.button>
```

### LoadingSpinner

```typescript
<motion.div 
  initial={{ opacity: 0, scale: 0.8 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.5 }}
>
  <motion.div 
    initial={{ opacity: 0, rotate: -180 }}
    animate={{ opacity: 1, rotate: 0 }}
    transition={{ duration: 0.8, ease: "easeOut" }}
  />
</motion.div>
```

## 🎨 Easing Functions

Menggunakan custom easing untuk animasi yang smooth:

```typescript
ease: [0.25, 0.46, 0.45, 0.94] // Custom cubic-bezier
```

## ⏱️ Timing & Delays

### Staggered Animations
- **Subject Buttons**: 0.1s delay per button
- **Teacher Cards**: 0.2s delay per card
- **Card Elements**: 0.3s delay untuk image, 0.4s untuk text

### Duration
- **Quick Animations**: 0.2s - 0.3s (hover, tap)
- **Standard Animations**: 0.5s - 0.6s (reveal, fade)
- **Complex Animations**: 0.8s (image reveal, loading)

## 📱 Responsive Animations

Animasi disesuaikan untuk berbagai ukuran layar:

- **Desktop**: Full animations dengan 3D effects
- **Tablet**: Simplified animations
- **Mobile**: Optimized for performance

## 🚀 Performance Optimizations

### 1. **Viewport Detection**
```typescript
viewport={{ once: true, margin: "-100px" }}
```
- Animasi hanya trigger sekali
- Margin untuk early trigger

### 2. **Lazy Loading**
- Animasi hanya load saat komponen visible
- Reduce initial bundle size

### 3. **Hardware Acceleration**
- Menggunakan transform properties
- GPU acceleration untuk smooth animations

## 🎭 Animation Types

### 1. **Fade Animations**
- `opacity: 0 → 1`
- Smooth transitions

### 2. **Slide Animations**
- `y: 50 → 0` (slide up)
- `x: -30/30 → 0` (slide left/right)

### 3. **Scale Animations**
- `scale: 0.9 → 1` (grow)
- `scale: 1 → 1.05` (hover)

### 4. **Rotate Animations**
- `rotate: -180 → 0` (spinner)
- `rotateY: -15 → 0` (3D image)

### 5. **Stagger Animations**
- Sequential reveal
- Delayed timing

## 🔧 Customization

### Mengubah Timing
```typescript
// Lebih cepat
transition={{ duration: 0.3, delay: index * 0.1 }}

// Lebih lambat
transition={{ duration: 0.8, delay: index * 0.3 }}
```

### Mengubah Easing
```typescript
// Bounce effect
ease: "easeOut"

// Smooth
ease: [0.25, 0.46, 0.45, 0.94]

// Elastic
ease: "easeInOut"
```

### Mengubah Animation Type
```typescript
// Slide dari bawah
hidden: { opacity: 0, y: 100 }

// Slide dari atas
hidden: { opacity: 0, y: -100 }

// Zoom in
hidden: { opacity: 0, scale: 0.5 }
```

## 🎯 Best Practices

### 1. **Accessibility**
- Animasi tidak mengganggu pengguna
- Reduced motion support
- Keyboard navigation friendly

### 2. **Performance**
- Gunakan `transform` dan `opacity`
- Avoid layout-triggering properties
- Hardware acceleration

### 3. **User Experience**
- Smooth dan natural
- Tidak terlalu cepat/lambat
- Consistent timing

### 4. **Mobile Optimization**
- Reduced animations on mobile
- Touch-friendly interactions
- Battery-friendly

## 🐛 Troubleshooting

### Animasi Tidak Muncul
- Pastikan Framer Motion terinstall
- Check viewport settings
- Verify animation variants

### Animasi Terlalu Cepat/Lambat
- Adjust `duration` dan `delay`
- Test di berbagai device
- Consider user preferences

### Performance Issues
- Reduce animation complexity
- Use `will-change` CSS property
- Optimize for mobile

## 📊 Animation Metrics

### Performance Targets
- **60fps**: Smooth animations
- **<16ms**: Frame time
- **<100ms**: Total animation duration

### User Experience
- **Engagement**: Increased time on page
- **Satisfaction**: Better visual feedback
- **Accessibility**: Inclusive design

## 🎨 Design System

### Color Transitions
- Smooth color changes
- Consistent with brand colors
- Accessible contrast ratios

### Typography Animations
- Text reveal effects
- Readable during animation
- Proper timing for reading

### Layout Animations
- Smooth layout changes
- No jarring movements
- Predictable behavior

Animasi ini membuat halaman guru terlihat lebih modern, profesional, dan memberikan pengalaman pengguna yang lebih baik! 🎉 