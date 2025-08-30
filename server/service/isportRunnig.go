package service

import (
	"fmt"
	"net"
	"time"
)

func IsPortInUse(port int) bool {
	address := fmt.Sprintf("127.0.0.1:%d", port)
	conn, err := net.DialTimeout("tcp", address, 1*time.Second)
	if err != nil {
		return false
	}
	conn.Close()
	return true
}

func WaitForPort(port int, timeout time.Duration) bool {
	deadline := time.Now().Add(timeout)
	count := 0
	for time.Now().Before(deadline) {
		conn, err := net.DialTimeout("tcp", fmt.Sprintf("127.0.0.1:%d", port), 1*time.Second)
		if err == nil {
			conn.Close()
			return true // port พร้อมแล้ว
		}
		time.Sleep(500 * time.Millisecond) // รอแล้วลองใหม่
		count++
		// fmt.Println("Waiting for port", port, "to be ready... Attempt:", count)
	}
	return false // timeout
}
