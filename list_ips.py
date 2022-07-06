from enum import unique
import os
import gzip
import sys

LOG_FIELDS = [
    "date", "time", "x-edge-location", "sc-bytes", "c-ip", "cs-method", "cs(Host)", "cs-uri-stem", "sc-status",
    "cs(Referer)", "cs(User-Agent)", "cs-uri-query", "cs(Cookie)", "x-edge-result-type", "x-edge-request-id",
    "x-host-header", "cs-protocol", "cs-bytes", "time-taken", "x-forwarded-for", "ssl-protocol", "ssl-cipher",
    "x-edge-response-result-type", "cs-protocol-version", "fle-status", "fle-encrypted-fields", "c-port",
    "time-to-first-byte", "x-edge-detailed-result-type", "sc-content-type", "sc-content-len", "sc-range-start",
    "sc-range-end"
]


def get_info_from_log(all_lines):

    unique_ips = set()

    for line in all_lines:
        line_parts = line.split()
        key_values = dict(zip(LOG_FIELDS, line_parts))

        unique_ips.add(key_values['c-ip'])

    print(f"Unique IPs: {len(unique_ips)}")
    with open("logs_cdn_unique_ips.log.txt", "wt") as f:
        for ip in unique_ips:
            print(ip)
            f.write(ip + "\n")


if __name__ == "__main__":

    if len(sys.argv) <= 1:
        arg = 'all'
    else:
        arg = sys.argv[1]
        assert arg in ('s3', 'cdn', 'all'), \
            "Provide argument 's3', 'cdn', or 'all'."

    # TODO
    assert arg not in ('s3',), "'s3' not supported yet."

    if arg in ('cdn', 'all'):
        CDN_DIR = "./logs/cdn/"
        cdn_logs = os.listdir(CDN_DIR)
        cdn_logs.sort()
        all_lines = []
        for f_path in cdn_logs:
            with gzip.open(os.path.join(CDN_DIR, f_path), 'rt') as f:
                all_lines.extend(f.readlines())
        print("Sorting...")
        all_lines.sort()

        print("Writing...")
        with open("logs_cdn_combined.log.txt", "wt") as f:
            f.writelines(all_lines)

        all_lines = [line for line in all_lines if not line.startswith('#')]
        get_info_from_log(all_lines)

        print("Done!")
