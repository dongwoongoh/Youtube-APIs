package main

import (
	"fmt"
	"math/rand"
	"time"
)

func main() {
	rand.Seed(time.Now().UnixNano())

	ch := make(chan int)

	start := time.Now()

	for i := 0; i < 10; i++ {
		go func() {
			n := rand.Intn(100)
			ch <- n
		}()
	}

	sum := 0
	for i := 0; i < 10; i++ {
		sum += <-ch
	}

	end := time.Now()
	elapsed := end.Sub(start)

	fmt.Println("Sum:", sum)
	fmt.Println("Elapsed time:", elapsed)
}
