package main

import (
	"container/heap"
	"fmt"
	"math"
)

type City struct {
	totalTime, maxWeight, leftGold, leftSilver, idx int
}

type MinHeap []*City

func (h MinHeap) Len() int {
	return len(h)
}
func (h MinHeap) Less(i, j int) bool {
	return h[i].totalTime < h[j].totalTime
}
func (h MinHeap) Swap(i, j int) {
	h[i], h[j] = h[j], h[i]
	h[i].idx, h[j].idx = i, j
}

func (h *MinHeap) Push(x interface{}) {
	n := len(*h)
	city := x.(*City)
	city.idx = n
	*h = append(*h, city)
}

func (h *MinHeap) Pop() interface{} {
	old := *h
	n := len(old)
	city := old[n-1]
	old[n-1] = nil
	city.idx = -1
	*h = old[0 : n-1]
	return city
}

func solution(a int, b int, g []int, s []int, w []int, t []int) int {
	h := &MinHeap{}
	heap.Init(h)
	totalGold, totalSilver := 0, 0
	minTime := 0
	for i := 0; i < len(g); i++ {
		totalGold += g[i]
		totalSilver += s[i]
		city := &City{
			totalTime: 2 * t[i],
			maxWeight: w[i],
			leftGold:  g[i],
			leftSilver: s[i],
			idx:       i,
		}
		if city.totalTime < 0 {
			minTime = city.totalTime
		}
		heap.Push(h, city)
	}
	needGold, needSilver := a, b
	for needGold > 0 || needSilver > 0 {
		city := heap.Pop(h).(*City)
		if city.totalTime < minTime {
			minTime = city.totalTime
		}
		amount := min(min(city.leftGold+city.leftSilver, city.maxWeight), needGold+needSilver)
		if amount > city.leftGold {
			city.leftSilver -= amount - city.leftGold
			needSilver -= amount - city.leftGold
			needGold -= city.leftGold
			city.leftGold = 0
		} else {
			city.leftGold -= amount
			needGold -= amount
		}
		city.totalTime += 2 * city.totalTime
		heap.Push(h, city)
	}
	return -minTime
}

func min(a, b int) int {
	if a < b {
		return a
	}
	return b
}

func main() {
	fmt.Println(solution(10, 10, []int{100}, []int{100}, []int{7}, []int{10}))
	fmt.Println(solution(90, 500, []int{70, 70, 0}, []int{0, 0, 500}, []int{100, 100, 2}, []int{4, 8, 1}))
}
