{
	"targets": [
		{
			"target_name": "fingerprint",
			"sources": [ "src-cpp/enroll.cpp", "src-cpp/verify.cpp", "src-cpp/identify.cpp", "src-cpp/fingerprint.cpp" ],
			"include_dirs": [
				"<!(node -e \"require('nan')\")",
				"<!(pkg-config --cflags libfprint)",
				"<!(pkg-config --cflags zlib)"
			],
			"libraries": [
				"<!(pkg-config --libs libfprint)",
				"<!(pkg-config --libs-only-l zlib)"
			],
			"variables": {
				"node_version": '<!(node --version | sed -e "s/^v\([0-9]*\\.[0-9]*\).*$/\\1/")',
			},
			"target_conditions": [
				[ "node_version == '0.10'", { "defines": ["OLD_UV_RUN_SIGNATURE"] } ]
			]
		}
	],
}
