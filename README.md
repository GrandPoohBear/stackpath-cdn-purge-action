# stackpath-cdn-purge-action

Purge files from a [StackPath CDN](https://www.stackpath.com/)

![Latest Release](https://img.shields.io/github/v/release/GrandPoohBear/stackpath-cdn-purge-action)

Purges are requested with the recursive flag, so you can ask for either a single file or an entire directory to be purged.

Example:

```
  - name: Purge old deploy from CDN
    uses: GrandPoohBear/stackpath-cdn-purge-action@v0.1.1
    with:
      clientId: ${{ secrets.STACKPATH_CLIENT_ID }}
      clientSecret: ${{ secrets.STACKPATH_CLIENT_SECRET }}
      stackId: my-default-stack-49218a
      url: https://purge.example.com/
```
