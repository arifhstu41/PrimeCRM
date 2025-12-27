<?php

namespace Database\Seeders;

use App\Models\Language;
use App\Models\Translation;
use Illuminate\Database\Seeder;

class LanguageSeeder extends Seeder
{
    public function run(): void
    {
        // Create languages
        $languages = [
            ['name' => 'English', 'code' => 'en', 'flag' => '🇺🇸', 'is_default' => true],
            ['name' => 'Spanish', 'code' => 'es', 'flag' => '🇪🇸'],
            ['name' => 'French', 'code' => 'fr', 'flag' => '🇫🇷'],
            ['name' => 'German', 'code' => 'de', 'flag' => '🇩🇪'],
        ];

        foreach ($languages as $lang) {
            Language::create($lang);
        }

        // Create basic translations
        $translations = [
            // Navigation
            ['key' => 'nav.dashboard', 'en' => 'Dashboard', 'es' => 'Panel', 'fr' => 'Tableau de bord', 'de' => 'Dashboard'],
            ['key' => 'nav.users', 'en' => 'Users', 'es' => 'Usuarios', 'fr' => 'Utilisateurs', 'de' => 'Benutzer'],
            ['key' => 'nav.settings', 'en' => 'Settings', 'es' => 'Configuración', 'fr' => 'Paramètres', 'de' => 'Einstellungen'],
            ['key' => 'nav.languages', 'en' => 'Languages', 'es' => 'Idiomas', 'fr' => 'Langues', 'de' => 'Sprachen'],
            ['key' => 'nav.translations', 'en' => 'Translations', 'es' => 'Traducciones', 'fr' => 'Traductions', 'de' => 'Übersetzungen'],
            
            // Common
            ['key' => 'common.search', 'en' => 'Search', 'es' => 'Buscar', 'fr' => 'Rechercher', 'de' => 'Suchen'],
            ['key' => 'common.name', 'en' => 'Name', 'es' => 'Nombre', 'fr' => 'Nom', 'de' => 'Name'],
            ['key' => 'common.email', 'en' => 'Email', 'es' => 'Correo', 'fr' => 'Email', 'de' => 'E-Mail'],
            ['key' => 'common.active', 'en' => 'Active', 'es' => 'Activo', 'fr' => 'Actif', 'de' => 'Aktiv'],
        ];

        foreach ($translations as $trans) {
            $key = $trans['key'];
            unset($trans['key']);
            
            foreach ($trans as $langCode => $value) {
                Translation::create([
                    'key' => $key,
                    'value' => $value,
                    'language_code' => $langCode
                ]);
            }
        }
    }
}