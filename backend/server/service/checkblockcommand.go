package service

import (
	"regexp"
	"strings"
)

func CheckIsBlacklisted(command string) bool {
	// แปลงเป็น lowercase ก่อน
	cmdLower := strings.ToLower(command)

	// รายการ regex pattern สำหรับคำสั่งอันตราย
	patterns := []*regexp.Regexp{
		regexp.MustCompile(`rm\s+-rf\s+/`),             // rm -rf /
		regexp.MustCompile(`rm\s+-r\s+/`),              // rm -r /
		regexp.MustCompile(`sudo\s+`),                  // sudo ...
		regexp.MustCompile(`chmod\s+777`),              // chmod 777
		regexp.MustCompile(`chown\s+`),                 // chown ...
		regexp.MustCompile(`mkfs(\.|ext|btrfs|xfs)?`),  // mkfs, mkfs.ext4, mkfs.xfs
		regexp.MustCompile(`:\(\)\s*{\s*:.*};:`),       // fork bomb
		regexp.MustCompile(`shutdown\s+(-h|-r|now)?`),  // shutdown
		regexp.MustCompile(`reboot`),                   // reboot
		regexp.MustCompile(`poweroff`),                 // poweroff
		regexp.MustCompile(`init\s+0`),                 // init 0
		regexp.MustCompile(`halt`),                     // halt
		regexp.MustCompile(`dd\s+if=`),                  // dd if=
		regexp.MustCompile(`wget\s+`),                  // wget ...
		regexp.MustCompile(`curl\s+`),                  // curl ...
		regexp.MustCompile(`scp\s+`),                   // scp ...
		regexp.MustCompile(`ftp\s+`),                   // ftp ...
		regexp.MustCompile(`nc\s+`),                    // netcat
		regexp.MustCompile(`nmap`),                     // nmap
		regexp.MustCompile(`iptables`),                 // iptables
		regexp.MustCompile(`ufw\s+`),                    // ufw ...
	}

	// ตรวจทุก pattern
	for _, pattern := range patterns {
		if pattern.MatchString(cmdLower) {
			return true
		}
	}

	return false
}
