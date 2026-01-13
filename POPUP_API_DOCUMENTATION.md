# Popup Settings API Documentation

## Overview
API untuk mengkonfigurasi popup welcome yang muncul di homepage website. Popup dapat dikonfigurasi melalui backend dengan berbagai opsi seperti gambar, link, delay, dan pengaturan tampilan.

## Endpoint

### GET `/api/v1/popup-settings`

Mengambil konfigurasi popup yang aktif.

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "is_active": true,
    "image_url": "https://example.com/popup-image.jpg",
    "image_alt": "Welcome Popup",
    "link_url": "https://example.com/promotion",
    "open_in_new_tab": true,
    "show_on_first_visit_only": false,
    "delay_before_show": 1000,
    "expires_at": "2025-12-31T23:59:59.000000Z",
    "created_at": "2025-01-01T00:00:00.000000Z",
    "updated_at": "2025-01-15T10:30:00.000000Z"
  }
}
```

### POST `/api/v1/popup-settings`

Membuat atau memperbarui konfigurasi popup.

**Request Body:**
```json
{
  "is_active": true,
  "image_url": "https://example.com/popup-image.jpg",
  "image_alt": "Welcome Popup",
  "link_url": "https://example.com/promotion",
  "open_in_new_tab": true,
  "show_on_first_visit_only": false,
  "delay_before_show": 1000,
  "expires_at": "2025-12-31T23:59:59.000000Z"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Popup settings updated successfully",
  "data": {
    "id": 1,
    "is_active": true,
    "image_url": "https://example.com/popup-image.jpg",
    "image_alt": "Welcome Popup",
    "link_url": "https://example.com/promotion",
    "open_in_new_tab": true,
    "show_on_first_visit_only": false,
    "delay_before_show": 1000,
    "expires_at": "2025-12-31T23:59:59.000000Z",
    "created_at": "2025-01-01T00:00:00.000000Z",
    "updated_at": "2025-01-15T10:30:00.000000Z"
  }
}
```

## Field Descriptions

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `is_active` | boolean | Yes | Menentukan apakah popup aktif atau tidak |
| `image_url` | string | Yes | URL gambar popup (dapat berupa URL eksternal atau path relatif) |
| `image_alt` | string | No | Teks alternatif untuk gambar (untuk aksesibilitas) |
| `link_url` | string | No | URL yang akan dibuka ketika popup diklik (opsional) |
| `open_in_new_tab` | boolean | No | Jika true, link akan dibuka di tab baru (default: false) |
| `show_on_first_visit_only` | boolean | No | Jika true, popup hanya muncul sekali per user (menggunakan localStorage) |
| `delay_before_show` | integer | No | Delay dalam milliseconds sebelum popup muncul (default: 0) |
| `expires_at` | datetime | No | Tanggal dan waktu kapan popup akan expire (format: ISO 8601) |

## Implementation Example (Laravel)

### Migration
```php
Schema::create('popup_settings', function (Blueprint $table) {
    $table->id();
    $table->boolean('is_active')->default(true);
    $table->string('image_url');
    $table->string('image_alt')->nullable();
    $table->string('link_url')->nullable();
    $table->boolean('open_in_new_tab')->default(false);
    $table->boolean('show_on_first_visit_only')->default(false);
    $table->integer('delay_before_show')->default(0);
    $table->timestamp('expires_at')->nullable();
    $table->timestamps();
});
```

### Model
```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PopupSetting extends Model
{
    protected $fillable = [
        'is_active',
        'image_url',
        'image_alt',
        'link_url',
        'open_in_new_tab',
        'show_on_first_visit_only',
        'delay_before_show',
        'expires_at',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'open_in_new_tab' => 'boolean',
        'show_on_first_visit_only' => 'boolean',
        'delay_before_show' => 'integer',
        'expires_at' => 'datetime',
    ];
}
```

### Controller
```php
<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\PopupSetting;
use Illuminate\Http\Request;

class PopupSettingsController extends Controller
{
    public function index()
    {
        $settings = PopupSetting::where('is_active', true)
            ->where(function ($query) {
                $query->whereNull('expires_at')
                    ->orWhere('expires_at', '>', now());
            })
            ->latest()
            ->first();

        if (!$settings) {
            return response()->json([
                'success' => true,
                'data' => [
                    'is_active' => false,
                    'image_url' => '',
                ]
            ]);
        }

        return response()->json([
            'success' => true,
            'data' => $settings
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'is_active' => 'required|boolean',
            'image_url' => 'required|string',
            'image_alt' => 'nullable|string',
            'link_url' => 'nullable|url',
            'open_in_new_tab' => 'nullable|boolean',
            'show_on_first_visit_only' => 'nullable|boolean',
            'delay_before_show' => 'nullable|integer|min:0',
            'expires_at' => 'nullable|date',
        ]);

        // Deactivate all existing popups
        PopupSetting::where('is_active', true)->update(['is_active' => false]);

        $settings = PopupSetting::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Popup settings created successfully',
            'data' => $settings
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $settings = PopupSetting::findOrFail($id);

        $validated = $request->validate([
            'is_active' => 'sometimes|boolean',
            'image_url' => 'sometimes|string',
            'image_alt' => 'nullable|string',
            'link_url' => 'nullable|url',
            'open_in_new_tab' => 'nullable|boolean',
            'show_on_first_visit_only' => 'nullable|boolean',
            'delay_before_show' => 'nullable|integer|min:0',
            'expires_at' => 'nullable|date',
        ]);

        $settings->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Popup settings updated successfully',
            'data' => $settings
        ]);
    }
}
```

### Routes
```php
Route::prefix('v1')->group(function () {
    Route::get('/popup-settings', [PopupSettingsController::class, 'index']);
    Route::post('/popup-settings', [PopupSettingsController::class, 'store']);
    Route::put('/popup-settings/{id}', [PopupSettingsController::class, 'update']);
});
```

## Frontend Usage

Frontend sudah terintegrasi dengan API ini. Popup akan otomatis:
1. Mengambil konfigurasi dari endpoint `/api/v1/popup-settings`
2. Menampilkan popup jika `is_active` adalah `true`
3. Menghormati pengaturan `show_on_first_visit_only` (menggunakan localStorage)
4. Menampilkan popup dengan delay sesuai `delay_before_show`
5. Mengecek `expires_at` dan tidak menampilkan jika sudah expired
6. Menampilkan gambar dari `image_url`
7. Membuka link jika `link_url` disediakan

## Notes

- Jika API gagal, frontend akan fallback ke popup default (`/popupimage.jpg`)
- `show_on_first_visit_only` menggunakan localStorage dengan key `has_seen_popup`
- Popup dapat diklik untuk menutup (selain jika ada link_url)
- Sound effect (`/popupeffect.mp3`) akan diputar ketika popup muncul
