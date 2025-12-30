package main

import (
	"intruderUi/pkg"
	"embed"

	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/options"
	"github.com/wailsapp/wails/v2/pkg/options/assetserver"
)

//go:embed all:frontend/dist
var assets embed.FS

func main() {
	// Create an instance of the app structure

	app := NewApp()
	exit := pkg.NewExit()

	// Create application with options
	err := wails.Run(&options.App{
		Title:  "intruderWatcher",
		Width: 350,
		Height: 580,
		
		AssetServer: &assetserver.Options{
			Assets: assets,
		},
		BackgroundColour: &options.RGBA{R: 27, G: 38, B: 54, A: 1},
		Frameless:        true,
		OnStartup:        app.startup,
		Bind: []interface{}{
			app,
			exit,
		},
	})

	if err != nil {
		println("Error:", err.Error())
	}
}
