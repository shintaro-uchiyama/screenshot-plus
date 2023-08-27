// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::{LogicalSize, Manager, Size};

fn main() {
    tauri::Builder::default()
        .setup(|app| {
            let main_window = app.get_window("main").unwrap();
            main_window
                .set_size(Size::Logical(LogicalSize {
                    width: 480.0,
                    height: 180.0,
                }))
                .unwrap();
            main_window.set_resizable(false).unwrap();
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
