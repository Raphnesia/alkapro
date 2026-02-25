# Teacher Management System - Complete Setup

## 🎯 **Overview**

Sistem manajemen data guru yang lengkap dengan backend Laravel dan frontend Next.js, termasuk pengaturan banner dan informasi halaman.

## 🔧 **Backend Setup (Laravel)**

### **1. Teacher Model**
```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Teacher extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'position',
        'subject',
        'type',
        'photo',
        'bio',
        'education',
        'experience',
        'is_active',
        'order_index',
        'guruData' // JSON field untuk pengaturan halaman
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'order_index' => 'integer',
        'guruData' => 'array'
    ];
}
```

### **2. Migration**
```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('teachers', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('position');
            $table->string('subject');
            $table->enum('type', ['teacher', 'staff', 'principal', 'vice_principal']);
            $table->string('photo')->nullable();
            $table->text('bio')->nullable();
            $table->string('education')->nullable();
            $table->string('experience')->nullable();
            $table->boolean('is_active')->default(true);
            $table->integer('order_index')->default(0);
            $table->json('guruData')->nullable(); // Untuk pengaturan banner
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('teachers');
    }
};
```

### **3. TeacherSettingController**
```php
<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Teacher;
use Illuminate\Http\JsonResponse;

class TeacherSettingController extends Controller
{
    public function index(): JsonResponse
    {
        $teacher = Teacher::where('guruData->active', true)->first();
        
        if (!$teacher) {
            // Jika tidak ada yang aktif, ambil teacher pertama dan set guruData default
            $teacher = Teacher::first();
            if (!$teacher) {
                return response()->json([
                    'success' => true,
                    'data' => [
                        'title' => 'Guru & Staff',
                        'subtitle' => 'Mengenal lebih dekat dengan para pengajar dan staf kami',
                        'banner_desktop' => null,
                        'banner_mobile' => null,
                        'date' => 'Terbaru',
                        'read_time' => '3 min',
                        'author' => 'Admin',
                    ]
                ]);
            }
        }

        $guruData = $teacher->guruData ?? [
            'title' => 'Guru & Staff',
            'subtitle' => 'Mengenal lebih dekat dengan para pengajar dan staf kami',
            'date' => 'Terbaru',
            'read_time' => '3 min',
            'author' => 'Admin',
        ];

        return response()->json([
            'success' => true,
            'data' => [
                'title' => $guruData['title'] ?? 'Guru & Staff',
                'subtitle' => $guruData['subtitle'] ?? 'Mengenal lebih dekat dengan para pengajar dan staf kami',
                'banner_desktop' => isset($guruData['banner_desktop']) ? url('storage/' . $guruData['banner_desktop']) : null,
                'banner_mobile' => isset($guruData['banner_mobile']) ? url('storage/' . $guruData['banner_mobile']) : null,
                'date' => $guruData['date'] ?? 'Terbaru',
                'read_time' => $guruData['read_time'] ?? '3 min',
                'author' => $guruData['author'] ?? 'Admin',
            ]
        ]);
    }

    public function update(Request $request): JsonResponse
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'subtitle' => 'required|string|max:500',
            'banner_desktop' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            'banner_mobile' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            'date' => 'required|string|max:100',
            'read_time' => 'required|string|max:50',
            'author' => 'required|string|max:100',
        ]);

        $teacher = Teacher::where('guruData->active', true)->first();
        
        if (!$teacher) {
            $teacher = Teacher::first();
            if (!$teacher) {
                return response()->json([
                    'success' => false,
                    'message' => 'No teacher found'
                ], 404);
            }
        }

        $guruData = [
            'title' => $request->title,
            'subtitle' => $request->subtitle,
            'date' => $request->date,
            'read_time' => $request->read_time,
            'author' => $request->author,
            'active' => true
        ];

        // Handle banner uploads
        if ($request->hasFile('banner_desktop')) {
            $bannerDesktop = $request->file('banner_desktop');
            $bannerDesktopPath = $bannerDesktop->store('guru-banners', 'public');
            $guruData['banner_desktop'] = $bannerDesktopPath;
        }

        if ($request->hasFile('banner_mobile')) {
            $bannerMobile = $request->file('banner_mobile');
            $bannerMobilePath = $bannerMobile->store('guru-banners', 'public');
            $guruData['banner_mobile'] = $bannerMobilePath;
        }

        $teacher->update(['guruData' => $guruData]);

        return response()->json([
            'success' => true,
            'message' => 'Teacher settings updated successfully',
            'data' => $guruData
        ]);
    }
}
```

### **4. Routes**
```php
// routes/api.php
Route::prefix('v1')->group(function () {
    Route::get('/teachers', [TeacherController::class, 'index']);
    Route::get('/teachers/by-subject', [TeacherController::class, 'getBySubject']);
    Route::get('/teachers/list', [TeacherController::class, 'getTeachersOnly']);
    Route::get('/staff/list', [TeacherController::class, 'getStaffOnly']);
    Route::get('/teacher-settings', [TeacherSettingController::class, 'index']);
    Route::post('/teacher-settings', [TeacherSettingController::class, 'update']);
});
```

### **5. Filament Resource**
```php
<?php

namespace App\Filament\Resources;

use App\Filament\Resources\TeacherResource\Pages;
use App\Models\Teacher;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class TeacherResource extends Resource
{
    protected static ?string $model = Teacher::class;
    protected static ?string $navigationIcon = 'heroicon-o-academic-cap';
    protected static ?string $navigationGroup = 'Guru & Staff';
    protected static ?string $navigationLabel = 'Daftar Guru & Staff';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Informasi Guru')
                    ->schema([
                        Forms\Components\TextInput::make('name')
                            ->label('Nama Lengkap')
                            ->required()
                            ->maxLength(255),
                        
                        Forms\Components\TextInput::make('position')
                            ->label('Jabatan')
                            ->required()
                            ->maxLength(255),
                        
                        Forms\Components\TextInput::make('subject')
                            ->label('Mata Pelajaran')
                            ->required()
                            ->maxLength(255),
                        
                        Forms\Components\Select::make('type')
                            ->label('Tipe')
                            ->options([
                                'teacher' => 'Guru',
                                'staff' => 'Staff',
                                'principal' => 'Kepala Sekolah',
                                'vice_principal' => 'Wakil Kepala Sekolah',
                            ])
                            ->required(),
                        
                        Forms\Components\FileUpload::make('photo')
                            ->label('Foto')
                            ->image()
                            ->directory('teachers')
                            ->visibility('public'),
                        
                        Forms\Components\Textarea::make('bio')
                            ->label('Biografi')
                            ->rows(3)
                            ->maxLength(1000),
                        
                        Forms\Components\TextInput::make('education')
                            ->label('Pendidikan Terakhir')
                            ->maxLength(255),
                        
                        Forms\Components\TextInput::make('experience')
                            ->label('Pengalaman')
                            ->maxLength(255),
                        
                        Forms\Components\Toggle::make('is_active')
                            ->label('Aktif')
                            ->default(true),
                        
                        Forms\Components\TextInput::make('order_index')
                            ->label('Urutan')
                            ->numeric()
                            ->default(0),
                    ])->columns(2),
                
                Forms\Components\Section::make('Pengaturan Halaman Guru')
                    ->schema([
                        Forms\Components\Toggle::make('guruData.active')
                            ->label('Aktifkan Pengaturan Ini')
                            ->default(false),
                        
                        Forms\Components\TextInput::make('guruData.title')
                            ->label('Judul Banner')
                            ->maxLength(255),
                        
                        Forms\Components\Textarea::make('guruData.subtitle')
                            ->label('Subtitle Banner')
                            ->rows(2)
                            ->maxLength(500),
                        
                        Forms\Components\FileUpload::make('guruData.banner_desktop')
                            ->label('Banner Desktop')
                            ->image()
                            ->directory('guru-banners')
                            ->visibility('public'),
                        
                        Forms\Components\FileUpload::make('guruData.banner_mobile')
                            ->label('Banner Mobile')
                            ->image()
                            ->directory('guru-banners')
                            ->visibility('public'),
                        
                        Forms\Components\TextInput::make('guruData.date')
                            ->label('Tanggal')
                            ->maxLength(100),
                        
                        Forms\Components\TextInput::make('guruData.read_time')
                            ->label('Waktu Baca')
                            ->maxLength(50),
                        
                        Forms\Components\TextInput::make('guruData.author')
                            ->label('Penulis')
                            ->maxLength(100),
                    ])->columns(2),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\ImageColumn::make('photo')
                    ->label('Foto')
                    ->circular(),
                
                Tables\Columns\TextColumn::make('name')
                    ->label('Nama')
                    ->searchable()
                    ->sortable(),
                
                Tables\Columns\TextColumn::make('position')
                    ->label('Jabatan')
                    ->searchable(),
                
                Tables\Columns\TextColumn::make('subject')
                    ->label('Mata Pelajaran')
                    ->searchable(),
                
                Tables\Columns\BadgeColumn::make('type')
                    ->label('Tipe')
                    ->colors([
                        'primary' => 'teacher',
                        'success' => 'staff',
                        'warning' => 'principal',
                        'danger' => 'vice_principal',
                    ]),
                
                Tables\Columns\IconColumn::make('is_active')
                    ->label('Aktif')
                    ->boolean(),
                
                Tables\Columns\TextColumn::make('order_index')
                    ->label('Urutan')
                    ->sortable(),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('type')
                    ->options([
                        'teacher' => 'Guru',
                        'staff' => 'Staff',
                        'principal' => 'Kepala Sekolah',
                        'vice_principal' => 'Wakil Kepala Sekolah',
                    ]),
                
                Tables\Filters\TernaryFilter::make('is_active')
                    ->label('Status Aktif'),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ])
            ->defaultSort('order_index', 'asc');
    }

    public static function getRelations(): array
    {
        return [];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListTeachers::route('/'),
            'create' => Pages\CreateTeacher::route('/create'),
            'edit' => Pages\EditTeacher::route('/{record}/edit'),
        ];
    }
}
```

## 🎨 **Frontend Integration**

### **1. Updated Service**
```typescript
// src/services/teacherService.ts
export const getTeacherSettings = async (): Promise<TeacherSettings> => {
  try {
    const response = await fetch(`${API_BASE_URL}/teacher-settings`)
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const result: ApiResponse<TeacherSettings> = await response.json()
    return result.data
  } catch (error) {
    console.error('Error fetching teacher settings:', error)
    // Return fallback settings if API fails
    return {
      title: 'Tim Guru Profesional SMP Muhammadiyah Al Kautsar PK Kartasura',
      subtitle: 'Tenaga pengajar berkualitas dengan dedikasi tinggi untuk pendidikan terbaik dan pembentukan karakter Islami.',
      banner_desktop: '/guru/Adam-Muttaqien-M.Si_.jpg',
      banner_mobile: '/guru/Cindy-Trisnawati-S.Pd-M.Pd_.jpg',
      date: '17 Juli 2025',
      read_time: '5 Menit untuk membaca',
      author: 'Tim Humas SMP'
    }
  }
}
```

### **2. Dynamic Banner Data**
```typescript
// src/app/profil/guru/page.tsx
const { teachersData, teacherSettings, subjects, loading, error, refetch } = useTeachers()

// Dynamic banner data dari API
const guruData = teacherSettings || {
  title: 'Tim Guru Profesional SMP Muhammadiyah Al Kautsar PK Kartasura',
  subtitle: 'Tenaga pengajar berkualitas dengan dedikasi tinggi untuk pendidikan terbaik dan pembentukan karakter Islami.',
  banner_desktop: '/guru/Adam-Muttaqien-M.Si_.jpg',
  banner_mobile: '/guru/Cindy-Trisnawati-S.Pd-M.Pd_.jpg',
  date: '17 Juli 2025',
  read_time: '5 Menit untuk membaca',
  author: 'Tim Humas SMP'
}
```

## 🚀 **Setup Instructions**

### **1. Backend Setup**
```bash
# 1. Create migration
php artisan make:migration create_teachers_table

# 2. Run migration
php artisan migrate

# 3. Create controller
php artisan make:controller Api/TeacherSettingController

# 4. Create resource
php artisan make:filament-resource Teacher

# 5. Add routes to api.php
# 6. Configure storage link
php artisan storage:link
```

### **2. Frontend Setup**
```bash
# 1. Update environment variables
NEXT_PUBLIC_API_URL=http://api.alkapro.id/api/v1

# 2. Install dependencies (if needed)
npm install

# 3. Run development server
npm run dev
```

## 🎯 **Features**

### **Admin Panel (Filament)**
- ✅ CRUD untuk data guru dan staff
- ✅ Upload foto guru
- ✅ Pengaturan banner halaman
- ✅ Pengaturan judul dan subtitle
- ✅ Upload banner desktop dan mobile
- ✅ Pengaturan meta information

### **Frontend**
- ✅ Dynamic banner dari API
- ✅ Teacher data dari API
- ✅ Subject navigation
- ✅ Responsive design
- ✅ Fallback data

### **API Endpoints**
- ✅ `GET /api/v1/teachers` - Semua guru & staff
- ✅ `GET /api/v1/teachers/by-subject` - Guru grouped by subject
- ✅ `GET /api/v1/teachers/list` - Hanya guru
- ✅ `GET /api/v1/staff/list` - Hanya staff
- ✅ `GET /api/v1/teacher-settings` - Pengaturan banner
- ✅ `POST /api/v1/teacher-settings` - Update pengaturan

## 🔍 **Testing**

### **Backend Testing**
```bash
# Test API endpoints
curl http://api.alkapro.id/api/v1/teachers
curl http://api.alkapro.id/api/v1/teachers/by-subject
curl http://api.alkapro.id/api/v1/teacher-settings
```

### **Frontend Testing**
1. Buka `http://localhost:3000/profil/guru`
2. Cek apakah banner tampil dengan benar
3. Cek apakah teacher data tampil
4. Test subject navigation

## 🎉 **Benefits**

### **For Administrators**
- ✅ Easy content management via Filament
- ✅ Dynamic banner settings
- ✅ Flexible teacher data management
- ✅ Professional admin interface

### **For Users**
- ✅ Dynamic content from backend
- ✅ Professional appearance
- ✅ Responsive design
- ✅ Smooth user experience

Sistem manajemen guru sekarang lengkap dan siap untuk production! 🚀 