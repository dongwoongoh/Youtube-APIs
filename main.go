package main

import (
	"fmt"
	"sync"
	"time"
)

var (
	counter int
	mutex   sync.Mutex
)

func main() {
	start := time.Now()

	var wg sync.WaitGroup
	wg.Add(2)

	go func() {
		defer wg.Done()

		for i := 0; i < 1000000; i++ {
			mutex.Lock()
			counter++
			mutex.Unlock()
		}
	}()

	go func() {
		defer wg.Done()

		for i := 0; i < 1000000; i++ {
			mutex.Lock()
			counter++
			mutex.Unlock()
		}
	}()

	wg.Wait()

	fmt.Println("Counter:", counter)
	fmt.Println("Elapsed time:", time.Since(start))
}
