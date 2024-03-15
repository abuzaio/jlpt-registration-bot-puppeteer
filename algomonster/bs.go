package main

import (
	"math"
	"slices"
)

/*
An array of boolean values is divided into two sections;
the left section consists of all false and the right section
consists of all true. Find the First True in a Sorted Boolean
Array of the right section, i.e. the index of the first true
element. If there is no true element, return -1.
[F, F, F, T, T, T]

The binary decision we have to make when we look at an element is:
-> if the element is false, we discard everything to the left and
the current element itself.
-> if the element is true, the current element could be the first
true although there may be other true to the left. We discard
everything to the right but what about the current element?

We can either keep the current element in the range or record it
somewhere and then discard it. Here we choose the latter. We'll
discuss the other approach in the alternative solution section.

We keep a variable boundary_index that represents the leftmost true's
index currently recorded. If the current element is true, then we
update boundary_index with its index and discard everything to the
right including the current element itself since its index has been
recorded by the variable.

Time Complexity: O(log(n))
Space Complexity: O(1)

[F, F, F, T, T, T]

# Alternative approach

Another approach to handle case 2 above is to keep the current
element  in the search range instead of discarding it,
i.e. if arr[mid]: right = mid  instead of right = mid - 1. However,
doing this without modifying the while  condition will result in an
infinite loop. This is because when left == right, right = mid will not
modify right and thus, not shrink search range and we will be stuck in
the while loop forever. To make this work we have to remove the equality
in the while condition. In addition, as mentioned in the last module, a
while loop without equality will miss the single-element edge case so we
have to add an additional check after the loop to handle this case.
Overall, we have to make three modifications to the vanilla binary
search to make it work.

[F, F, F, T, T, T] -> [T, T, T] -> [T] (index-4 = T) -> [] (index-3 = T)
-> left > right
*/
func findBoundary(arr []bool) int {
	left := 0
	right := len(arr) - 1
	firstTrueIndex := -1
	for left <= right {
		mid := (left + right) / 2
		if arr[mid] {
			firstTrueIndex = mid
			right = mid - 1
		} else {
			left = mid + 1
		}
	}
	return firstTrueIndex
}

/*
Given an array of integers sorted in increasing order and a target,
find the index of the first element in the array that is larger
than or equal to the target. Assume that it is guaranteed to find a
satisfying number.

arr = [2, 3, 5, 7, 11, 13, 17, 19]
target = 6
# Output: 3

[2, 3, 5, 7, 11, 13, 17, 19] = [F, F, F, T, T, T, T, T]
[2, 3, 5, 7, 11, 13, 17, 19] -> [2, 3, 5] (index-3 = 7) -> [5] (index-3 = 7)
-> [] (index-3 = 7) -> left > right
*/
func findFirstNotSmaller(arr []int, target int) int {
	left := 0
	right := len(arr) - 1
	firstLargeOrEqualIndex := -1
	for left <= right {
		mid := (left + right) / 2
		if arr[mid] >= target {
			firstLargeOrEqualIndex = mid
			right = mid - 1
		} else {
			left = mid + 1
		}
	}
	return firstLargeOrEqualIndex
}

/*
Given a sorted array of integers and a target integer, find the first
occurrence of the target and return its index. Return -1 if the target
is not in the array.

The problem is equivalent to finding the boundary of elements < 3 and
elements >= 3. As we go from the left to the right of the sorted array,
once we see an element equal to 3, the rest of the array should also be
greater than or equal to 3. The feasible function is arr[i] >= 3.

[1, 3, 3, 3, 3, 6, 10, 10, 10, 100] -> [F, F, F, F, F, T, T, T, T, T]

Now the problem is reduced to finding the first true element in a boolean
array. And we already know how to do this from the Find the First True in
a Sorted Boolean Array module.

Time Complexity: O(log(n))
Space Complexity: O(1)

Caveat: note that the feasible function checks whether the element is
greater than or equal to the target. But the question asks for the index of
the first element exactly equal to the target. Our template updates ans = mid
whenever arr[mid] >= target. Therefore we have to make a small modification
to the template and move ans = mid to only when arr[mid] == target and not
arr[mid] >= target.

arr = [1, 3, 3, 3, 3, 6, 10, 10, 10, 100]
target = 6
# Output = 5
[1, 3, 3, 3, 3, 6, 10, 10, 10, 100] = [F, F, F, F, F, T, T, T, T, T]
[1, 3, 3, 3, 3, 6, 10, 10, 10, 100] -> [6, 10, 10, 10, 100] -> [6, 10]
-> [6] (index-5) -> [] (index-5) -> left > right
*/
func findFirstOccurence(arr []int, target int) int {
	left, right := 0, len(arr)-1
	ans := -1
	for left <= right {
		mid := (left + right) / 2
		if arr[mid] == target {
			ans = mid
			right = mid - 1
		} else if arr[mid] < target {
			left = mid + 1
		} else {
			right = mid - 1
		}
	}
	return ans
}

/*
Given a non-negative integer n, return the square root of n rounded down to
the nearest integer. The returned integer should be non-negative as well.

[0...n] -> [0...49] -> [0...24] -> [0...12] -> [6...12] -> [6...9] -> [7]
Constraints: squareRoot() <= n
[0, 1, 2, 3, 4, 5, 6, 7, 8, 9] = [F, F, F, T, T, T, T, T, T, T]
[0, 1, 2, 3, 4, 5, 6, 7, 8, 9] -> [0, 1, 2, 3] -> [2, 3] (index-1)
-> [3] (index-2) -> [] (index-3) -> left > right
*/
func squareRoot(n int) int {
	if n == 0 || n == 1 {
		return n
	}
	left, right := 0, n
	firstSmallerOrEqualIndex := -1
	for left <= right {
		mid := (left + right) / 2
		if mid*mid == n {
			return mid
		} else if mid*mid < n {
			left = mid + 1
			firstSmallerOrEqualIndex = mid
		} else {
			right = mid - 1
		}
	}
	return firstSmallerOrEqualIndex
}

/*
A sorted array of unique integers was rotated at an unknown pivot. For example,
[10, 20, 30, 40, 50] becomes [30, 40, 50, 10, 20]. Find the index of the minimum
element in this array.

At first glance, it seems that there's no way to do it in less than linear time.
The array is not sorted.
But remember binary search can work beyond sorted arrays, as long as there is a
binary decision we can use to shrink the search range.

Let's draw a figure and see if there's any pattern. If we plot the numbers
against their index, we get:

				50
			/		\
		40				\
	/						\

30								\				20

	\		/
		10

Notice the numbers are divided into two sections: numbers larger than the last
element of the array and numbers smaller than it. The minimum element is at the
boundary between the two sections.
We can apply a feasible function of < the last element and get the boolean array
that characterizes the two sections.
[30, 40, 50, 10, 20] -> [F, F, F, T, T]

Now the problem is yet again reduced to finding the first true element in a
boolean array. And we already know how to do this from Find the First True in a
Sorted Boolean Array module.

[30, 40, 50, 10, 20] -> [10, 20] -> [10] (index-3 = 10) -> [] (index-3 = 10)
-> left > right
[2, 3, 7, 9, 11, 0, 1] -> [11, 0, 1] -> [11] (index-5 = 0) -> [] (index-5 = 0)
-> left > right
*/
func findMinRotated(arr []int) int {
	left, right := 0, len(arr)-1
	minRotatedIndex := -1
	for left <= right {
		mid := (left + right) / 2
		if arr[mid] <= arr[len(arr)-1] {
			right = mid - 1
			minRotatedIndex = mid
		} else {
			left = mid + 1
		}
	}
	return minRotatedIndex
}

/*
A mountain array is defined as an array that
-> has at least 3 elements
-> has an element with the largest value called "peak", with index k.
The array elements strictly increase from the first element to A[k],
and then strictly decreases from A[k + 1] to the last element of the array.
Thus creating a "mountain" of numbers.

That is, given A[0]<...<A[k-1]<A[k]>A[k+1]>...>A[n-1], we need to find the
index k. Note that the peak element is neither the first nor the last
element of the array.

Find the index of the peak element. Assume there is only one peak element.

The array strictly increases until the peak element and then strictly
decreases. The monotonicity is a strong sign that we can use binary search
to find the peak element.

To use binary search though, we need the entire search range to be strictly
increasing or decreasing. We need to find the feasible function that returns
false for elements up until the peak and true from the peak to the end.

We already know the array strictly decreases from the peak element to the
last element. So we can try to use a feasible function of arr[i]> arr[i+1]
to return true for elements from the peak to the last element. Once we do
that, we realize that also returns false from the first element to the
peak element. We got our feasible function.

A minor edge case is for the last element as it has no next element. We can
pad the array with an imaginary node of negative infinity. In the implementation,
we don't actually need to pad the array as that would incur O(n) extra cost.
We can just check if i+1 is out of bounds and return true if it is since this
implies arr[i] is the last element.

[0, 1, 2, 3, 2, 1, 0] = [F, F, F, T, T, T, T]
[0, 10, 5, 2] = [F, T, T, T]

Now the problem is reduced to finding the first true element in a boolean array.
And we already know how to do this from Find the First True in a Sorted Boolean
Array module.

[0, 1, 2, 3, 2, 1, 0]  -> [0, 1, 2] (3) -> [2] -> left > right
[0, 10, 5, 2] -> [0] (10) -> left > right
*/
func peakOfMountainArray(arr []int) int {
	left, right := 0, len(arr)-1
	peakIndex := -1
	for left <= right {
		mid := (left + right) / 2
		// Guaranteed the peak is not at the end
		// (if not guaranteed, add OR condition `mid == len(arr) - 1`)
		if arr[mid] > arr[mid+1] {
			right = mid - 1
			peakIndex = mid
		} else {
			left = mid + 1
		}
	}
	return peakIndex
}

/*
You've begun your new job to organize newspapers. Each morning, you are to
separate the newspapers into smaller piles and assign each pile to a co-worker.
This way, your co-workers can read through the newspapers and examine its
contents simultaneously.

Each newspaper is marked with a read time to finish all its contents. A worker
can read one newspaper at a time, and when they finish a newspaper, they can
start reading the next newspaper. Your goal is to minimize the amount of time
needed for your co-workers to finish all newspapers. Additionally, the newspapers
came in a particular order, and you must not disarrange the original ordering
when distributing the newspapers. In other words, you cannot pick and choose
newspapers randomly from the whole pile to assign to a co-worker, but rather you
must take a subsection of consecutive newspapers from the whole pile.

What is the minimum amount of time it would take to have your coworkers go
through all the newspapers? That is, if you optimize the distribution of
newspapers, what is the longest read time among all piles?

Example 1:
Input: newspapers_read_times = [7,2,5,10,8], num_coworkers = 2
Output: 18
Explanation:
Assign first 3 newspapers to one coworker then assign the rest to another.
The time it takes for the first 3 newspapers is 7 + 2 + 5 = 14 and for the
last 2 is 10 + 8 = 18.

Example 2:
Input: newspapers_read_times = [2,3,5,7], num_coworkers = 3
Output: 7
Explanation:
Assign [2, 3], [5], and [7] separately to workers. The minimum time is 7.
*/
func newspaperSplit(newspaperReadTimes []int, numCoworkers int) int {
	feasible := func(timePerWorker int) bool {
		workersNeeded := 1
		timeLeftForCurrentWorker := timePerWorker
		for _, newspaperTime := range newspaperReadTimes {
			if newspaperTime > timeLeftForCurrentWorker {
				workersNeeded += 1
				timeLeftForCurrentWorker = timePerWorker
				if workersNeeded > numCoworkers {
					return false
				}
				timeLeftForCurrentWorker -= newspaperTime
			}
		}
		return true
	}
	sum := func(arr []int) int {
		arrSum := 0
		for _, v := range arr {
			arrSum += v
		}
		return arrSum
	}

	// [7,2,5,10,8]
	// left -> maximum read time value; ex: 10
	// right -> total sum of read times; ex: 32
	left, right := slices.Max(newspaperReadTimes), sum(newspaperReadTimes)
	feasibleBoundary := -1
	for left <= right {
		mid := left + (right-left)/2
		if feasible(mid) {
			right = mid - 1
			feasibleBoundary = mid
		} else {
			left = mid + 1
		}
	}
	return feasibleBoundary
}

/*
Koko loves to eat bananas. There are n piles of bananas, the ith pile has p
iles[i] bananas. The guards have gone and will come back in h hours.

Koko can decide her bananas-per-hour eating speed of k. Each hour, she chooses
some pile of bananas and eats k bananas from that pile. If the pile has less
than k bananas, she eats all of them instead and will not eat any more bananas
during this hour.

Koko likes to eat slowly but still wants to finish eating all the bananas before
the guards return.

Return the minimum integer k such that she can eat all the bananas within h hours.

Constraints:
1 <= piles.length <= 10^4
piles.length <= h <= 10^9
1 <= piles[i] <= 10^9

We want to apply and implement the feasible function. Here, the feasible function
is whether Koko canFinishEating() all piles within h hours while eating at speed k
per hour.

Since Koko eats at only one pile during each hour, ceil(float(p)/k) is the time Koko
takes to finish pile p. Note that p/k does not work here because we want a whole
number of hours so we needed to round up p/k. Therefore, the feasiblity is determined
by whether Koko's hoursUsed is within h hours, where hoursUsed is the total hours
to finish all piles.
*/
func minEatingSpeed(piles []int, h int) int {
	canFinishEating := func(k int) bool {
		hoursUsed := 0
		for _, p := range piles {
			// p = amount of banana per pile (max banana of each pile is 10^9)
			// k = speed/amount of eating bananas-per-hour -> (mid value to check
			//	   finishable k in <= h)
			// hU = p / k <---> k = p / hU <---> p = k * hU
			// Accumulate hours used from rounded up p/k
			hoursUsed += int(math.Ceil(float64(p) / float64(k)))
		}
		return hoursUsed <= h
	}
	left, right := 1, 1000000000 // 1 <= piles[i] <= 10^9
	for left <= right {
		mid := (left + right) / 2
		if canFinishEating(mid) {
			right = mid - 1
		} else {
			left = mid + 1
		}
	}
	return left
}