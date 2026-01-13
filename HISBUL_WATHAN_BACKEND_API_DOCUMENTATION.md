# Dokumentasi Backend API untuk Hisbul Wathan

## Overview
Dokumentasi ini menjelaskan API endpoints yang diperlukan untuk mendukung halaman Hisbul Wathan di frontend Next.js. API ini mengikuti struktur yang sama dengan IPM API yang sudah ada.

## Base URL
```
https://api.alkapro.id/api/v1
```

## Required API Endpoints

### 1. Get Complete Hisbul Wathan Data
**Endpoint:** `GET /hisbul-wathan/complete`

**Response Structure:**
```json
{
  "success": true,
  "message": "Data retrieved successfully",
  "data": {
    "settings": {
      "id": 1,
      "title": "Hisbul Wathan",
      "subtitle": "Organisasi kepanduan Islam yang membentuk karakter dan kepemimpinan",
      "banner_desktop": "/storage/hisbul-wathan/banner-desktop.jpg",
      "banner_mobile": "/storage/hisbul-wathan/banner-mobile.jpg",
      "title_panel_bg_color": "bg-gradient-to-r from-green-600 to-green-800",
      "subtitle_panel_bg_color": "bg-gradient-to-r from-green-700 to-green-900",
      "mobile_panel_bg_color": "bg-gradient-to-r from-green-700 to-green-800",
      "is_active": true
    },
    "pengurus": [
      {
        "id": 1,
        "position": "Ketua Hisbul Wathan",
        "name": "Ahmad Fauzi",
        "photo": "/storage/hisbul-wathan/pengurus/ahmad-fauzi.jpg",
        "kelas": "IX A",
        "description": "Ketua Hisbul Wathan SMP Muhammadiyah Al Kautsar PK Kartasura",
        "order_index": 1,
        "is_active": true,
        "created_at": "2024-01-01T00:00:00.000000Z",
        "updated_at": "2024-01-01T00:00:00.000000Z"
      }
    ],
    "content": [
      {
        "id": 1,
        "title": "Struktur Organisasi Hisbul Wathan",
        "content": "Berikut adalah struktur organisasi Hisbul Wathan SMP Muhammadiyah Al Kautsar PK Kartasura:",
        "grid_type": "grid-cols-2",
        "use_list_disc": true,
        "list_items": null,
        "bidang_structure": [
          {
            "bidang_name": "Bidang Kepanduan",
            "members": [
              {
                "name": "Arif Rahman",
                "position": "Ketua Bidang"
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

### 2. Get Hisbul Wathan Settings Only
**Endpoint:** `GET /hisbul-wathan/settings`

**Response Structure:**
```json
{
  "success": true,
  "message": "Settings retrieved successfully",
  "data": {
    "id": 1,
    "title": "Hisbul Wathan",
    "subtitle": "Organisasi kepanduan Islam yang membentuk karakter dan kepemimpinan",
    "banner_desktop": "/storage/hisbul-wathan/banner-desktop.jpg",
    "banner_mobile": "/storage/hisbul-wathan/banner-mobile.jpg",
    "title_panel_bg_color": "bg-gradient-to-r from-green-600 to-green-800",
    "subtitle_panel_bg_color": "bg-gradient-to-r from-green-700 to-green-900",
    "mobile_panel_bg_color": "bg-gradient-to-r from-green-700 to-green-800",
    "is_active": true
  }
}
```

### 3. Get Hisbul Wathan Pengurus
**Endpoint:** `GET /hisbul-wathan`

**Response Structure:**
```json
{
  "success": true,
  "message": "Pengurus retrieved successfully",
  "data": [
    {
      "id": 1,
      "position": "Ketua Hisbul Wathan",
      "name": "Ahmad Fauzi",
      "photo": "/storage/hisbul-wathan/pengurus/ahmad-fauzi.jpg",
      "kelas": "IX A",
      "description": "Ketua Hisbul Wathan SMP Muhammadiyah Al Kautsar PK Kartasura",
      "order_index": 1,
      "is_active": true,
      "created_at": "2024-01-01T00:00:00.000000Z",
      "updated_at": "2024-01-01T00:00:00.000000Z"
    }
  ]
}
```

### 4. Get Hisbul Wathan Content
**Endpoint:** `GET /hisbul-wathan-content`

**Response Structure:**
```json
{
  "success": true,
  "message": "Content retrieved successfully",
  "data": [
    {
      "id": 1,
      "title": "Struktur Organisasi Hisbul Wathan",
      "content": "Berikut adalah struktur organisasi Hisbul Wathan SMP Muhammadiyah Al Kautsar PK Kartasura:",
      "grid_type": "grid-cols-2",
      "use_list_disc": true,
      "list_items": null,
      "bidang_structure": [
        {
          "bidang_name": "Bidang Kepanduan",
          "members": [
            {
              "name": "Arif Rahman",
              "position": "Ketua Bidang"
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

### 5. Get Single Hisbul Wathan Pengurus
**Endpoint:** `GET /hisbul-wathan/{id}`

**Response Structure:**
```json
{
  "success": true,
  "message": "Pengurus retrieved successfully",
  "data": {
    "id": 1,
    "position": "Ketua Hisbul Wathan",
    "name": "Ahmad Fauzi",
    "photo": "/storage/hisbul-wathan/pengurus/ahmad-fauzi.jpg",
    "kelas": "IX A",
    "description": "Ketua Hisbul Wathan SMP Muhammadiyah Al Kautsar PK Kartasura",
    "order_index": 1,
    "is_active": true,
    "created_at": "2024-01-01T00:00:00.000000Z",
    "updated_at": "2024-01-01T00:00:00.000000Z"
  }
}
```

## Database Schema

### 1. Table: `hisbul_wathan_settings`
```sql
CREATE TABLE hisbul_wathan_settings (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    subtitle TEXT,
    banner_desktop VARCHAR(255),
    banner_mobile VARCHAR(255),
    title_panel_bg_color VARCHAR(255) DEFAULT 'bg-gradient-to-r from-green-600 to-green-800',
    subtitle_panel_bg_color VARCHAR(255) DEFAULT 'bg-gradient-to-r from-green-700 to-green-900',
    mobile_panel_bg_color VARCHAR(255) DEFAULT 'bg-gradient-to-r from-green-700 to-green-800',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP NULL DEFAULT NULL,
    updated_at TIMESTAMP NULL DEFAULT NULL
);
```

### 2. Table: `hisbul_wathan_pengurus`
```sql
CREATE TABLE hisbul_wathan_pengurus (
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

### 3. Table: `hisbul_wathan_content`
```sql
CREATE TABLE hisbul_wathan_content (
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

**HisbulWathanSettings.php**
```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HisbulWathanSettings extends Model
{
    use HasFactory;

    protected $table = 'hisbul_wathan_settings';

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

**HisbulWathanPengurus.php**
```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HisbulWathanPengurus extends Model
{
    use HasFactory;

    protected $table = 'hisbul_wathan_pengurus';

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

**HisbulWathanContent.php**
```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HisbulWathanContent extends Model
{
    use HasFactory;

    protected $table = 'hisbul_wathan_content';

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

**HisbulWathanController.php**
```php
<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\HisbulWathanSettings;
use App\Models\HisbulWathanPengurus;
use App\Models\HisbulWathanContent;
use Illuminate\Http\Request;

class HisbulWathanController extends Controller
{
    public function complete()
    {
        try {
            $settings = HisbulWathanSettings::where('is_active', true)->first();
            $pengurus = HisbulWathanPengurus::where('is_active', true)
                ->orderBy('order_index')
                ->get();
            $content = HisbulWathanContent::where('is_active', true)
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
            $settings = HisbulWathanSettings::where('is_active', true)->first();

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
            $pengurus = HisbulWathanPengurus::where('is_active', true)
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
            $pengurus = HisbulWathanPengurus::where('is_active', true)->findOrFail($id);

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
            $content = HisbulWathanContent::where('is_active', true)
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
use App\Http\Controllers\Api\HisbulWathanController;

// Hisbul Wathan Routes
Route::prefix('v1')->group(function () {
    Route::get('/hisbul-wathan/complete', [HisbulWathanController::class, 'complete']);
    Route::get('/hisbul-wathan/settings', [HisbulWathanController::class, 'settings']);
    Route::get('/hisbul-wathan', [HisbulWathanController::class, 'index']);
    Route::get('/hisbul-wathan/{id}', [HisbulWathanController::class, 'show']);
});

Route::get('/hisbul-wathan-content', [HisbulWathanController::class, 'content']);
```

### 4. Create Migrations

**create_hisbul_wathan_settings_table.php**
```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('hisbul_wathan_settings', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('subtitle')->nullable();
            $table->string('banner_desktop')->nullable();
            $table->string('banner_mobile')->nullable();
            $table->string('title_panel_bg_color')->default('bg-gradient-to-r from-green-600 to-green-800');
            $table->string('subtitle_panel_bg_color')->default('bg-gradient-to-r from-green-700 to-green-900');
            $table->string('mobile_panel_bg_color')->default('bg-gradient-to-r from-green-700 to-green-800');
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('hisbul_wathan_settings');
    }
};
```

**create_hisbul_wathan_pengurus_table.php**
```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('hisbul_wathan_pengurus', function (Blueprint $table) {
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
        Schema::dropIfExists('hisbul_wathan_pengurus');
    }
};
```

**create_hisbul_wathan_content_table.php**
```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('hisbul_wathan_content', function (Blueprint $table) {
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
        Schema::dropIfExists('hisbul_wathan_content');
    }
};
```

### 5. Sample Data Seeders

**HisbulWathanSeeder.php**
```php
<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\HisbulWathanSettings;
use App\Models\HisbulWathanPengurus;
use App\Models\HisbulWathanContent;

class HisbulWathanSeeder extends Seeder
{
    public function run()
    {
        // Settings
        HisbulWathanSettings::create([
            'title' => 'Hisbul Wathan',
            'subtitle' => 'Organisasi kepanduan Islam yang membentuk karakter dan kepemimpinan',
            'banner_desktop' => '/storage/hisbul-wathan/banner-desktop.jpg',
            'banner_mobile' => '/storage/hisbul-wathan/banner-mobile.jpg',
            'is_active' => true
        ]);

        // Pengurus
        $pengurus = [
            [
                'position' => 'Ketua Hisbul Wathan',
                'name' => 'Ahmad Fauzi',
                'photo' => '/storage/hisbul-wathan/pengurus/ahmad-fauzi.jpg',
                'kelas' => 'IX A',
                'description' => 'Ketua Hisbul Wathan SMP Muhammadiyah Al Kautsar PK Kartasura',
                'order_index' => 1
            ],
            [
                'position' => 'Wakil Ketua',
                'name' => 'Siti Aisyah',
                'photo' => '/storage/hisbul-wathan/pengurus/siti-aisyah.jpg',
                'kelas' => 'IX B',
                'description' => 'Wakil Ketua Hisbul Wathan SMP Muhammadiyah Al Kautsar PK Kartasura',
                'order_index' => 2
            ]
        ];

        foreach ($pengurus as $p) {
            HisbulWathanPengurus::create($p);
        }

        // Content
        HisbulWathanContent::create([
            'title' => 'Struktur Organisasi Hisbul Wathan',
            'content' => 'Berikut adalah struktur organisasi Hisbul Wathan SMP Muhammadiyah Al Kautsar PK Kartasura:',
            'grid_type' => 'grid-cols-2',
            'use_list_disc' => true,
            'bidang_structure' => [
                [
                    'bidang_name' => 'Bidang Kepanduan',
                    'members' => [
                        ['name' => 'Arif Rahman', 'position' => 'Ketua Bidang'],
                        ['name' => 'Dewi Sartika', 'position' => 'Anggota']
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
curl -X GET "https://api.alkapro.id/api/v1/hisbul-wathan/complete" \
  -H "Accept: application/json"

# Test pengurus endpoint
curl -X GET "https://api.alkapro.id/api/v1/hisbul-wathan" \
  -H "Accept: application/json"

# Test content endpoint
curl -X GET "https://api.alkapro.id/api/hisbul-wathan-content" \
  -H "Accept: application/json"
```

## File Storage Structure

Buat struktur folder untuk menyimpan gambar:

```
storage/app/public/
├── hisbul-wathan/
│   ├── banner-desktop.jpg
│   ├── banner-mobile.jpg
│   └── pengurus/
│       ├── ahmad-fauzi.jpg
│       ├── siti-aisyah.jpg
│       └── ...
```

Jalankan command untuk membuat symbolic link:
```bash
php artisan storage:link
```

## Notes

1. **Color Scheme**: Hisbul Wathan menggunakan warna hijau (green) sebagai tema utama, berbeda dengan IPM yang menggunakan merah.

2. **Bidang Structure**: JSON field `bidang_structure` menyimpan struktur organisasi yang kompleks dengan bidang dan anggota.

3. **Image Handling**: Semua path gambar menggunakan `/storage/` prefix yang akan di-resolve oleh Laravel storage system.

4. **Order Index**: Gunakan `order_index` untuk mengatur urutan tampilan pengurus dan content.

5. **Active Status**: Field `is_active` untuk mengontrol visibility data tanpa menghapus dari database.

Implementasi ini akan membuat backend API yang sepenuhnya kompatibel dengan frontend Hisbul Wathan yang sudah dibuat.
