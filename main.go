package main

import (
	"sort"
)

type Pair struct {
	genreName string
	total     int
	songs     []Song
}

type Song struct {
	id    int
	plays int
}

func solution(genres []string, plays []int) []int {
	genreToSongs := make(map[string]*Pair)

	for i := 0; i < len(genres); i++ {
		genre := genres[i]
		play := plays[i]
		pair, exist := genreToSongs[genre]

		if exist {
			pair.total += play
			pair.songs = append(pair.songs, Song{i, play})
		} else {
			genreToSongs[genre] = &Pair{genre, play, []Song{{i, play}}}
		}
	}

	for _, pair := range genreToSongs {
		sort.Slice(pair.songs, func(i, j int) bool {
			if pair.songs[i].plays == pair.songs[j].plays {
				return pair.songs[i].id < pair.songs[j].id
			}
			return pair.songs[i].plays > pair.songs[j].plays
		})
	}

	genresSorted := make([]*Pair, 0, len(genreToSongs))
	for _, value := range genreToSongs {
		genresSorted = append(genresSorted, value)
	}

	sort.Slice(genresSorted, func(i, j int) bool {
		return genresSorted[i].total > genresSorted[j].total
	})

	answer := []int{}
	for _, pair := range genresSorted {
		for i, song := range pair.songs {
			if i > 1 {
				break
			}
			answer = append(answer, song.id)
		}
	}

	return answer
}
