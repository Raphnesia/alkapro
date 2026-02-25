# Dokumentasi Backend API untuk Tapak Suci

## Overview
Dokumentasi ini menjelaskan API endpoints yang diperlukan untuk mendukung halaman Tapak Suci di frontend Next.js. API ini mengikuti struktur yang sama dengan IPM dan Hisbul Wathan API yang sudah ada.

## Base URL
```
https://api.alkapro.id/api/v1
```

## Required API Endpoints

### 1. Get Complete Tapak Suci Data
**Endpoint:** `GET /tapak-suci/complete`

**Response Structure:**
```json
{
  "success": true,
  "message": "Data retrieved successfully",
  "data": {
    "settings": {
      "id": 1,
      "title": "Tapak Suci Putera Muhammadiyah",
      "subtitle": "Seni bela diri Islam yang mengembangkan fisik, mental, dan spiritual",
      "banner_desktop": "/storage/tapak-suci/banner-desktop.jpg",
      "banner_mobile": "/storage/tapak-suci/banner-mobile.jpg",
      "title_panel_bg_color": "bg-gradient-to-r from-orange-600 to-red-700",
      "subtitle_panel_bg_color": "bg-gradient-to-r from-orange-700 to-red-800",
      "mobile_panel_bg_color": "bg-gradient-to-r from-orange-700 to-red-700",
      "is_active": true
    },
    "pengurus": [
      {
        "id": 1,
        "position": "Pelatih Utama",
        "name": "Ustadz Bambang Wijaya",
        "photo": "/storage/tapak-suci/pengurus/bambang-wijaya.jpg",
        "kelas": "Pelatih",
        "description": "Pelatih Utama Tapak Suci SMP Muhammadiyah Al Kautsar PK Kartasura",
        "order_index": 1,
        "is_active": true,
        "created_at": "2024-01-01T00:00:00.000000Z",
        "updated_at": "2024-01-01T00:00:00.000000Z"
      }
    ],
    "content": [
      {
        "id": 1,
        "title": "Struktur Organisasi Tapak Suci",
        "content": "Berikut adalah struktur organisasi Tapak Suci SMP Muhammadiyah Al Kautsar PK Kartasura:",
        "grid_type": "grid-cols-2",
        "use_list_disc": true,
        "list_items": null,
        "bidang_structure": [
          {
            "bidang_name": "Bidang Teknik Dasar",
            "members": [
              {
                "name": "Andi Setiawan",
                "position": "Koordinator"
              }
            ]
          }
        ],
        "background_color": "bg-white",
        "border_color": "border-gray-200",
        "order_index": 1,
        "is_active": true,
        "created_at": "2024-01-01T00:00:00.000000Z",
        "updated_at": "2024-01-01T00:00:00.000000Z"
      }
    ]
  }
}
```

### 2. Get Tapak Suci Settings Only
**Endpoint:** `GET /tapak-suci/settings`

**Response Structure:**
```json
{
  "success": true,
  "message": "Settings retrieved successfully",
  "data": {
    "id": 1,
    "title": "Tapak Suci Putera Muhammadiyah",
    "subtitle": "Seni bela diri Islam yang mengembangkan fisik, mental, dan spiritual",
    "banner_desktop": "/storage/tapak-suci/banner-desktop.jpg",
    "banner_mobile": "/storage/tapak-suci/banner-mobile.jpg",
    "title_panel_bg_color": "bg-gradient-to-r from-orange-600 to-red-700",
    "subtitle_panel_bg_color": "bg-gradient-to-r from-orange-700 to-red-800",
    "mobile_panel_bg_color": "bg-gradient-to-r from-orange-700 to-red-700",
    "is_active": true
  }
}
```

### 3. Get Tapak Suci Pengurus
**Endpoint:** `GET /tapak-suci`

**Response Structure:**
```json
{
  "success": true,
  "message": "Pengurus retrieved successfully",
  "data": [
    {
      "id": 1,
      "position": "Pelatih Utama",
      "name": "Ustadz Bambang Wijaya",
      "photo": "/storage/tapak-suci/pengurus/bambang-wijaya.jpg",
      "kelas": "Pelatih",
      "description": "Pelatih Utama Tapak Suci SMP Muhammadiyah Al Kautsar PK Kartasura",
      "order_index": 1,
      "is_active": true,
      "created_at": "2024-01-01T00:00:00.000000Z",
      "updated_at": "2024-01-01T00:00:00.000000Z"
    }
  ]
}
```

### 4. Get Tapak Suci Content
**Endpoint:** `GET /tapak-suci-content`

**Response Structure:**
```json
{
  "success": true,
  "message": "Content retrieved successfully",
  "data": [
    {
      "id": 1,
      "title": "Struktur Organisasi Tapak Suci",
      "content": "Berikut adalah struktur organisasi Tapak Suci SMP Muhammadiyah Al Kautsar PK Kartasura:",
      "grid_type": "grid-cols-2",
      "use_list_disc": true,
      "list_items": null,
      "bidang_structure": [
        {
          "bidang_name": "Bidang Teknik Dasar",
          "members": [
            {
              "name": "Andi Setiawan",
              "position": "Koordinator"
            }
          ]
        }
      ],
      "background_color": "bg-white",
      "border_color": "border-gray-200",
      "order_index": 1,
      "is_active": true,
      "created_at": "2024-01-01T00:00:00.000000Z",
      "updated_at": "2024-01-01T00:00:00.000000Z"
    }
  ]
}
```

### 5. Get Single Tapak Suci Pengurus
**Endpoint:** `GET /tapak-suci/{id}`

**Response Structure:**
```json
{
  "success": true,
  "message": "Pengurus retrieved successfully",
  "data": {
    "id": 1,
    "position": "Pelatih Utama",
    "name": "Ustadz Bambang Wijaya",
    "photo": "/storage/tapak-suci/pengurus/bambang-wijaya.jpg",
    "kelas": "Pelatih",
    "description": "Pelatih Utama Tapak Suci SMP Muhammadiyah Al Kautsar PK Kartasura",
    "order_index": 1,
    "is_active": true,
    "created_at": "2024-01-01T00:00:00.000000Z",
    "updated_at": "2024-01-01T00:00:00.000000Z"
  }
}
```

## Database Schema

### 1. Table: `tapak_suci_settings`
```sql
CREATE TABLE tapak_suci_settings (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    subtitle TEXT,
    banner_desktop VARCHAR(255),
    banner_mobile VARCHAR(255),
    title_panel_bg_color VARCHAR(255) DEFAULT 'bg-gradient-to-r from-orange-600 to-red-700',
    subtitle_panel_bg_color VARCHAR(255) DEFAULT 'bg-gradient-to-r from-orange-700 to-red-800',
    mobile_panel_bg_color VARCHAR(255) DEFAULT 'bg-gradient-to-r from-orange-700 to-red-700',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP NULL DEFAULT NULL,
    updated_at TIMESTAMP NULL DEFAULT NULL
);
```

### 2. Table: `tapak_suci_pengurus`
```sql
CREATE TABLE tapak_suci_pengurus (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    position VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    photo VARCHAR(255),
    kelas VARCHAR(50),
    description TEXT,
    order_index INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP NULL DEFAULT NULL,
    updated_at TIMESTAMP NULL DEFAULT NULL
);
```

### 3. Table: `tapak_suci_content`
```sql
CREATE TABLE tapak_suci_content (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content LONGTEXT,
    grid_type VARCHAR(50) DEFAULT 'grid-cols-2',
    use_list_disc BOOLEAN DEFAULT FALSE,
    list_items JSON,
    bidang_structure JSON,
    background_color VARCHAR(255) DEFAULT 'bg-white',
    border_color VARCHAR(255) DEFAULT 'border-gray-200',
    order_index INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP NULL DEFAULT NULL,
    updated_at TIMESTAMP NULL DEFAULT NULL
);
```

## Laravel Implementation Guide

### 1. Create Models

**TapakSuciSettings.php**
```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TapakSuciSettings extends Model
{
    use HasFactory;

    protected $table = 'tapak_suci_settings';

    protected $fillable = [
        'title',
        'subtitle',
        'banner_desktop',
        'banner_mobile',
        'title_panel_bg_color',
        'subtitle_panel_bg_color',
        'mobile_panel_bg_color',
        'is_active'
    ];

    protected $casts = [
        'is_active' => 'boolean'
    ];
}
```

**TapakSuciPengurus.php**
```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TapakSuciPengurus extends Model
{
    use HasFactory;

    protected $table = 'tapak_suci_pengurus';

    protected $fillable = [
        'position',
        'name',
        'photo',
        'kelas',
        'description',
        'order_index',
        'is_active'
    ];

    protected $casts = [
        'is_active' => 'boolean'
    ];
}
```

**TapakSuciContent.php**
```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TapakSuciContent extends Model
{
    use HasFactory;

    protected $table = 'tapak_suci_content';

    protected $fillable = [
        'title',
        'content',
        'grid_type',
        'use_list_disc',
        'list_items',
        'bidang_structure',
        'background_color',
        'border_color',
        'order_index',
        'is_active'
    ];

    protected $casts = [
        'use_list_disc' => 'boolean',
        'is_active' => 'boolean',
        'list_items' => 'array',
        'bidang_structure' => 'array'
    ];
}
```

### 2. Create Controller

**TapakSuciController.php**
```php
<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\TapakSuciSettings;
use App\Models\TapakSuciPengurus;
use App\Models\TapakSuciContent;
use Illuminate\Http\Request;

class TapakSuciController extends Controller
{
    public function complete()
    {
        try {
            $settings = TapakSuciSettings::where('is_active', true)->first();
            $pengurus = TapakSuciPengurus::where('is_active', true)
                ->orderBy('order_index')
                ->get();
            $content = TapakSuciContent::where('is_active', true)
                ->orderBy('order_index')
                ->get();

            return response()->json([
                'success' => true,
                'message' => 'Data retrieved successfully',
                'data' => [
                    'settings' => $settings,
                    'pengurus' => $pengurus,
                    'content' => $content
                ]
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve data',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function settings()
    {
        try {
            $settings = TapakSuciSettings::where('is_active', true)->first();

            return response()->json([
                'success' => true,
                'message' => 'Settings retrieved successfully',
                'data' => $settings
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve settings',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function index()
    {
        try {
            $pengurus = TapakSuciPengurus::where('is_active', true)
                ->orderBy('order_index')
                ->get();

            return response()->json([
                'success' => true,
                'message' => 'Pengurus retrieved successfully',
                'data' => $pengurus
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve pengurus',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function show($id)
    {
        try {
            $pengurus = TapakSuciPengurus::where('is_active', true)->findOrFail($id);

            return response()->json([
                'success' => true,
                'message' => 'Pengurus retrieved successfully',
                'data' => $pengurus
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Pengurus not found',
                'error' => $e->getMessage()
            ], 404);
        }
    }

    public function content()
    {
        try {
            $content = TapakSuciContent::where('is_active', true)
                ->orderBy('order_index')
                ->get();

            return response()->json([
                'success' => true,
                'message' => 'Content retrieved successfully',
                'data' => $content
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve content',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
```

### 3. Add Routes

**routes/api.php**
```php
use App\Http\Controllers\Api\TapakSuciController;

// Tapak Suci Routes
Route::prefix('v1')->group(function () {
    Route::get('/tapak-suci/complete', [TapakSuciController::class, 'complete']);
    Route::get('/tapak-suci/settings', [TapakSuciController::class, 'settings']);
    Route::get('/tapak-suci', [TapakSuciController::class, 'index']);
    Route::get('/tapak-suci/{id}', [TapakSuciController::class, 'show']);
});

Route::get('/tapak-suci-content', [TapakSuciController::class, 'content']);
```

### 4. Create Migrations

**create_tapak_suci_settings_table.php**
```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('tapak_suci_settings', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('subtitle')->nullable();
            $table->string('banner_desktop')->nullable();
            $table->string('banner_mobile')->nullable();
            $table->string('title_panel_bg_color')->default('bg-gradient-to-r from-orange-600 to-red-700');
            $table->string('subtitle_panel_bg_color')->default('bg-gradient-to-r from-orange-700 to-red-800');
            $table->string('mobile_panel_bg_color')->default('bg-gradient-to-r from-orange-700 to-red-700');
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('tapak_suci_settings');
    }
};
```

**create_tapak_suci_pengurus_table.php**
```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('tapak_suci_pengurus', function (Blueprint $table) {
            $table->id();
            $table->string('position');
            $table->string('name');
            $table->string('photo')->nullable();
            $table->string('kelas', 50)->nullable();
            $table->text('description')->nullable();
            $table->integer('order_index')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('tapak_suci_pengurus');
    }
};
```

**create_tapak_suci_content_table.php**
```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('tapak_suci_content', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->longText('content')->nullable();
            $table->string('grid_type', 50)->default('grid-cols-2');
            $table->boolean('use_list_disc')->default(false);
            $table->json('list_items')->nullable();
            $table->json('bidang_structure')->nullable();
            $table->string('background_color')->default('bg-white');
            $table->string('border_color')->default('border-gray-200');
            $table->integer('order_index')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('tapak_suci_content');
    }
};
```

### 5. Sample Data Seeders

**TapakSuciSeeder.php**
```php
<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\TapakSuciSettings;
use App\Models\TapakSuciPengurus;
use App\Models\TapakSuciContent;

class TapakSuciSeeder extends Seeder
{
    public function run()
    {
        // Settings
        TapakSuciSettings::create([
            'title' => 'Tapak Suci Putera Muhammadiyah',
            'subtitle' => 'Seni bela diri Islam yang mengembangkan fisik, mental, dan spiritual',
            'banner_desktop' => '/storage/tapak-suci/banner-desktop.jpg',
            'banner_mobile' => '/storage/tapak-suci/banner-mobile.jpg',
            'is_active' => true
        ]);

        // Pengurus
        $pengurus = [
            [
                'position' => 'Pelatih Utama',
                'name' => 'Ustadz Bambang Wijaya',
                'photo' => '/storage/tapak-suci/pengurus/bambang-wijaya.jpg',
                'kelas' => 'Pelatih',
                'description' => 'Pelatih Utama Tapak Suci SMP Muhammadiyah Al Kautsar PK Kartasura',
                'order_index' => 1
            ],
            [
                'position' => 'Ketua Siswa',
                'name' => 'Rizky Pratama',
                'photo' => '/storage/tapak-suci/pengurus/rizky-pratama.jpg',
                'kelas' => 'IX A',
                'description' => 'Ketua Siswa Tapak Suci SMP Muhammadiyah Al Kautsar PK Kartasura',
                'order_index' => 2
            ]
        ];

        foreach ($pengurus as $p) {
            TapakSuciPengurus::create($p);
        }

        // Content
        TapakSuciContent::create([
            'title' => 'Struktur Organisasi Tapak Suci',
            'content' => 'Berikut adalah struktur organisasi Tapak Suci SMP Muhammadiyah Al Kautsar PK Kartasura:',
            'grid_type' => 'grid-cols-2',
            'use_list_disc' => true,
            'bidang_structure' => [
                [
                    'bidang_name' => 'Bidang Teknik Dasar',
                    'members' => [
                        ['name' => 'Andi Setiawan', 'position' => 'Koordinator'],
                        ['name' => 'Budi Santoso', 'position' => 'Asisten']
                    ]
                ]
            ],
            'order_index' => 1
        ]);
    }
}
```

## CORS Configuration

Pastikan CORS dikonfigurasi untuk mengizinkan request dari frontend:

**config/cors.php**
```php
'paths' => ['api/*', 'sanctum/csrf-cookie'],
'allowed_methods' => ['*'],
'allowed_origins' => ['http://localhost:3000', 'https://yourdomain.com'],
'allowed_origins_patterns' => [],
'allowed_headers' => ['*'],
'exposed_headers' => [],
'max_age' => 0,
'supports_credentials' => false,
```

## Testing Endpoints

Gunakan tools seperti Postman atau curl untuk testing:

```bash
# Test complete endpoint
curl -X GET "https://api.alkapro.id/api/v1/tapak-suci/complete" \
  -H "Accept: application/json"

# Test pengurus endpoint
curl -X GET "https://api.alkapro.id/api/v1/tapak-suci" \
  -H "Accept: application/json"

# Test content endpoint
curl -X GET "https://api.alkapro.id/api/tapak-suci-content" \
  -H "Accept: application/json"
```

## File Storage Structure

Buat struktur folder untuk menyimpan gambar:

```
storage/app/public/
├── tapak-suci/
│   ├── banner-desktop.jpg
│   ├── banner-mobile.jpg
│   └── pengurus/
│       ├── bambang-wijaya.jpg
│       ├── rizky-pratama.jpg
│       └── ...
```

Jalankan command untuk membuat symbolic link:
```bash
php artisan storage:link
```

## Notes

1. **Color Scheme**: Tapak Suci menggunakan warna orange/merah sebagai tema utama, sesuai dengan warna tradisional seni bela diri ini.

2. **Bidang Structure**: JSON field `bidang_structure` menyimpan struktur organisasi yang kompleks dengan bidang-bidang teknik bela diri:
   - Bidang Teknik Dasar
   - Bidang Teknik Lanjutan
   - Bidang Senjata Tradisional
   - Bidang Bela Diri Terapan
   - Bidang Mental Spiritual

3. **Martial Arts Focus**: Content disesuaikan dengan konteks seni bela diri Islam, termasuk aspek teknik, mental, dan spiritual.

4. **Image Handling**: Semua path gambar menggunakan `/storage/` prefix yang akan di-resolve oleh Laravel storage system.

5. **Order Index**: Gunakan `order_index` untuk mengatur urutan tampilan pengurus dan content.

6. **Active Status**: Field `is_active` untuk mengontrol visibility data tanpa menghapus dari database.

Implementasi ini akan membuat backend API yang sepenuhnya kompatibel dengan frontend Tapak Suci yang sudah dibuat.
