package pkg

import (
	"context"

	"github.com/wailsapp/wails/v2/pkg/runtime"
)

type Exit struct {
	ctx context.Context
}

func NewExit() *Exit {
	return &Exit{}
}

func (e *Exit) SetContext(ctx context.Context) {
	e.ctx = ctx
}

func (e *Exit) ExitApp() {
	runtime.Quit(e.ctx)
}
