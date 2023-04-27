package main

import "fmt"

type node struct {
    value int
    next  *node
}

type linkedList struct {
    head *node
}

func (list *linkedList) add(value int) {
    newNode := &node{value: value, next: list.head}
    list.head = newNode
}

func (list *linkedList) print() {
    currNode := list.head
    for currNode != nil {
        fmt.Printf("%d ", currNode.value)
        currNode = currNode.next
    }
    fmt.Println()
}

func main() {
    list := linkedList{}
    list.add(3)
    list.add(7)
    list.add(10)
    list.print()
}
