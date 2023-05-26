package main

import (
	"sort"
)

type Truck struct {
	g, s, w, t, tot int64
}

func check(trucks []Truck, target, a, b int64) bool {
	gold, silver, both := int64(0), int64(0), int64(0)

	for _, truck := range trucks {
		capacity := (target / (truck.t * 2)) * truck.w
		if target >= truck.t {
			capacity += truck.w
		}
		g := min(capacity, truck.g)
		capacity -= g
		s := min(capacity, truck.s)
		gold += g
		silver += s
		both += min(g+s, truck.tot)
	}

	if gold >= a && silver >= b {
		return true
	}
	return both >= a+b
}

func min(x, y int64) int64 {
	if x < y {
		return x
	}
	return y
}

func solution(a int, b int, g []int, s []int, w []int, t []int) int64 {
	trucks := []Truck{}
	for i := 0; i < len(g); i++ {
		trucks = append(trucks, Truck{int64(g[i]), int64(s[i]), int64(w[i]), int64(t[i]), int64(g[i] + s[i])})
	}

	sort.Slice(trucks, func(i, j int) bool {
		return trucks[i].t < trucks[j].t
	})

	left, right := int64(0), int64(1e18)
	for left < right {
		mid := (left + right) / 2
		if check(trucks, mid, int64(a), int64(b)) {
			right = mid
		} else {
			left = mid + 1
		}
	}

	return right
}
