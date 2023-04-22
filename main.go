package main

import (
	"fmt"
	"time"
)

func countNumbers() {
	for i := 1; i <= 5; i++ {
		fmt.Println("Count:", i)
		time.Sleep(1 * time.Second)
	}
}

func printLetters() {
	for char := 'a'; char <= 'e'; char++ {
		fmt.Printf("Letter: %c\n", char)
		time.Sleep(1 * time.Second)
	}
}

func main() {
	go countNumbers()
	go printLetters()
	time.Sleep(3 * time.Second)
}

