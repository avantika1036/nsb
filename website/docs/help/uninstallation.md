---
sidebar_label: Uninstallation
sidebar_position: 3
---

# Uninstallation

How to remove NSB from your system.


## Option 1 — Remove the Install Directory

```bash
rm -rf [install_path]/nsb
rm [install_path]/lib/pkgconfig/nsb.pc
```

This removes the installed library, headers, daemon binary, and pkg-config entry in one step.


## Option 2 — Use the Install Manifest

CMake records every file it installed in `install_manifest.txt`, inside your build directory. You can use this to remove exactly what was installed, nothing more:

```bash
xargs rm < build/install_manifest.txt
```



## Cleaning Up the Build Directory

Regardless of which option you used above, delete the build directory to remove all compiled artifacts:

```bash
rm -rf build/
```


## Go Deeper

- [Get Started](/get-started) — reinstalling NSB from scratch
- [Troubleshooting](/docs/help/troubleshooting) — fixing a broken installation instead of removing it
- [Project Structure](/docs/reference/project-structure) — what each installed file is for