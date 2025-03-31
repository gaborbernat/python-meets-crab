---
theme: default
transition: none
title: 🐍 Python meets the crab 🦀 - Friendship at first sight?
info: Python's simplicity often comes at the cost of performance, especially in
  computationally-intensive tasks. In contrast, Rust enables one to write
  low-level code that takes full advantage of the underlying hardware.
  Furthermore, Rust (just like Python) has a vibrant ecosystem with many great
  libraries. PyO3 (together with the maturin build backend) allows you to easily
  integrate the two languages together and make use of the best of both.
titleTemplate: "%s"
author: Bernát Gábor
mdc: true
canvasWidth: 1080
drawings:
  enabled: false
favicon: /logo.webp
slide_info: false
layout: cover
---

<h1 highlight> 🐍 Python meets the crab 🦀 </h1>

<h2 highlight> Friendship at first sight? — PyTexas <circle-flags-us-tx/> — April 13th 2025 </h2>

### By Bernát Gábor / [<logos-bluesky class="animate-pulse"/> gjbernat.bsky.social](https://bsky.app/profile/gjbernat.bsky.social) / [<prime-twitter class="animate-pulse"/> gjbernat](https://x.com/gjbernat)/ [<fluent-mdl2-website class="animate-pulse"/> bernat.tech]()

<QRCode data="https://gaborbernat.github.io/python-meets-crab" size=375 />

---
layout: intro
---

# Bernát Gábor

<div class="flex items-center">
  <div>
  <ul>
    <li>software engineer at Bloomberg (Data Technologies - Storage Platform)</li>
    <li v-click> OSS contributor <a target="_blank" href="https://github.com/gaborbernat">gaborbernat @ GitHub</a> - <a target="_blank" href="https://bernat.tech"> bernat.tech</a></li>
    <li v-click> member of the <span style="color: orange">Py</span>thon <span style="color: orange">P</span>ackaging <span style="color: orange">A</span>uthority (virtualen & build maintainer) </li>
    <li v-click> Husband to Lisa and parent to two Yorkshire Terriers: Silky & Junior </li>
    </ul>
  </div>
  <div>
    <img src="/me.webp" style="width: 350px; margin-left: 10px"/>
  </div>
</div>

---
layout: full
---

<CopyrightImg img="sj_intro"/>

---
layout: full
---

<h1 style="font-size: 2em !important; padding-bottom: 10px"> Born+raised in Transylvania, living in Los Angeles
<circle-flags-hu/><circle-flags-ro/><circle-flags-gb-eng/><circle-flags-us/></h1>

<CopyrightImg img="transylvania" maxHeight="500px">
              This file is licensed under the
              <a target="_blank" href="https://en.wikipedia.org/wiki/en:Creative_Commons" class="extiw" title="w:en:Creative Commons">Creative Commons </a>
              <a rel="nofollow" class="external text" target="_blank" href="https://creativecommons.org/licenses/by-sa/4.0/deed.en">Attribution-Share Alike 4.0 International </a>
              license.
</CopyrightImg>

---

# Some of the packages I maintain

<Maintain />

---
layout: statement
---

<h1>No such thing as a stupid question, just a <span highlight>missed opportunity to learn</span></h1>

---

# What is Python?

- Easy to read and write (clean).

<v-clicks>

- Garbace collected (no memory management).
- Interpreted language (though has a compilation phase, but to intermediate VM code).
- Optionally typed (not used at runtime).
- Error handling via exceptions.
- Both functional and object oriented.

</v-clicks>

---
layout: image
---

<CopyrightImg img="what_is"/>

---

# What is Rust?

Programming language created at Mozilla, and first released in 2012, emphasizes:

<v-clicks>

- performance (compiles to machine code),
- strongly typed (strict and explicit - so, a bit harder to read)

  ```rust
  pub fn vector_n_size(size: usize) -> Vec<u32> {
    return vec![0; size]
  }
  ```

- concurrency (through ownership memory model - by default, types are read-only).

</v-clicks>

---
layout: image
---

<CopyrightImg img="tennis"/>

---

# panic

Panic is an unrecovarable error: some core invariant expectation happened, need to shut down.

```rust
fn main() {
   panic!("Something went wrong!");
}
```

```shell
thread 'main' panicked at src/main.rs:2:4:
Something went wrong!
stack backtrace:
   0: rust_begin_unwind
             at /rustc/4eb161250e340c8f48f66e2b929ef4a5bed7c181/library/std/src/panicking.rs:692:5
   1: core::panicking::panic_fmt
             at /rustc/4eb161250e340c8f48f66e2b929ef4a5bed7c181/library/core/src/panicking.rs:75:14
   2: demo::main
             at ./src/main.rs:2:4
   3: core::ops::function::FnOnce::call_once
             at ~/.rustup/toolchains/stable-aarch64-apple-darwin/lib/rustlib/src/rust/library/core/src/ops/function.rs:250:5
note: Some details are omitted, run with `RUST_BACKTRACE=full` for a verbose backtrace.
```

---

# Macros

Code that gets automatically rewritten to some new code. Called via `!` at end of a method name:

```rust
println!("Print") // print something to the standard output

vec![1, 2, 3] // create a vector

panic!("Something went wrong!") // raise an unrecovarable error
```

---

# No exceptions

Error handling is done via `Option` and `Result` types.

```rust
fn main() {
  let empty: Option<&str> = None;
  if empty.is_none() {
      println!("Empty");
  }

  let result: Option<&str> = Some("Bernat");
  if let Some(name) = result {
      println!("{name}");
  }
}
```

<v-click>
```rust
pub fn main() {
  let result = Ok(1);
  match result {
      Ok(val) => {
          println!("{val}");
      }
      Err(err) => {
          println!("{:?}", err);
      }
  }
}
```
</v-click>

---

# Functional and trait oriented (mostly) with limited OOP

No multiple inheritence.

```rust
struct DataClass {
  first: u32,
  second: Vec<u32>,
}

pub trait Summary {
    fn summarize(&self) -> String;
}

impl Summary for DataClass {
    fn summarize(&self) -> String {
        format!("{} {:?}", self.first, self.second)
    }
}

let dc = DataClass {
    first: 1,
    second: vec![1, 2, 3],
};
println!("{}", dc.summarize());
```

---

# Immutable by default

When something is mutable, must be explicit:

````md magic-move
```rust
fn main() {
    let v = vec![1, 2];
    v.push(2);
}
```

```rust
fn main() {
    let mut v = vec![1, 2];
    v.push(2);
}
```
````

```shell
error[E0596]: cannot borrow `v` as mutable, as it is not declared as mutable
 --> src/main.rs:3:5
  |
3 |     v.push(2);
  |     ^ cannot borrow as mutable
  |
help: consider changing this to be mutable
  |
2 |     let mut v = vec![1, 2];
  |         +++
```

---

# Return by default

The final statement in a method is automatically returned:

````md magic-move
```rust
fn main() -> Vec<u32> {
   return vec![1, 2];
}
```

```rust
fn main() -> Vec<u32> {
    vec![1, 2]
}
```
````

---

# Packaging

A crate is the smallest amount of code that the Rust compiler considers at a time.

<span highlight>cargo</span> is the one-stop-shop package manager:

```shell
# build the release artifact
cargo build

# format the code
cargo fmt

# run the code linter
cargo clippy

# run the test suite
cargo test
```

---
layout: image
---

<CopyrightImg img="silky"/>

---

# Why would we want to create a friendship here?

<ul>
  <li v-click><span highlight>Speed</span> - performance!</li>
  <li v-click><span highlight>Reliability</span> - no GC causes smaller max latency (<a href="https://github.com/emmett-framework/granian">granian</a>)</li>
  <li v-click><span highlight>Feature re-use</span>: e.g. <a href="https://taplo.tamasfe.dev/">taplo</a> is a great TOML formatter</li>
  <li v-click>Slighthly easier <span highlight>security</span> models than C - the ownership modal ensures no memory corruption</li>
  <li v-click><span highlight>Concurrency</span> - until thread free Python becomes a thing, Rust can give you that now</li>
  <li v-click>Experience in the <span highlight>joy</span> (and misery) of both languages (learning Rust features will make you better at Python)</li>
</ul>

---

<h1><a href="https://pyo3.rs" highlight>PyO3</a> - the mediator</h1>

- Rust project that allows you to:

  - run Rust in Python,
  - run Python in Rust.

- Take care of the transition between languages.

<CopyrightImg img="python_crab" maxHeight="330px">
  Generated by Imagen 3. All copyrights reserved.
</CopyrightImg>

---

<h1><a href="https://www.maturin.rs" highlight>Maturin</a> - The way to interact with PyO3</h1>

- PEP-517 backend (and CLI) that hides away the Rust complexities to Python

<v-click>

- Alternatives:

  - setuptools-rust (existing setuptools projects)
  - rust-numpy (numpy with PyO3)

</v-click>

---

# How popular is Rust with Python?

- <a style="display: inline-flex" href="https://pepy.tech/projects/cryptography"><img src="https://static.pepy.tech/badge/cryptography/month" alt="PyPI Downloads"></a>
  &nbsp; [cryptography](https://cryptography.io) - cryptographic primitives and recipes,
- <a style="display: inline-flex" href="https://pepy.tech/projects/pydantic"><img src="https://static.pepy.tech/badge/pydantic-core/month" alt="PyPI Downloads"></a>&nbsp;
  [pydantic v2](https://docs.pydantic.dev) - data validation library,
- <a style="display: inline-flex" href="https://pepy.tech/projects/orjson"><img src="https://static.pepy.tech/badge/orjson/month" alt="PyPI Downloads"></a>&nbsp;
  [orjson](https://github.com/ijl/orjson#orjson) - orjson is a fast, correct JSON library for Python,
- <a style="display: inline-flex" href="https://pepy.tech/projects/ruff"><img src="https://static.pepy.tech/badge/ruff/month" alt="PyPI Downloads"></a>&nbsp;
  [ruff](https://docs.astral.sh/ruff/) - linter and code formatter for Python,
- <a style="display: inline-flex" href="https://pepy.tech/projects/tokenizers"><img src="https://static.pepy.tech/badge/tokenizers/month" alt="PyPI Downloads"></a>&nbsp;
  [tokenizers](https://github.com/huggingface/tokenizers#main-features) - by Hugging Face,
- <a style="display: inline-flex" href="https://pepy.tech/projects/tiktoken"><img src="https://static.pepy.tech/badge/tiktoken/month" alt="PyPI Downloads"></a>&nbsp;
  [tiktoken](https://github.com/openai/tiktoken) - a fast BPE tokeniser for use with OpenAI's models,
- <a style="display: inline-flex" href="https://pepy.tech/projects/uv"><img src="https://static.pepy.tech/badge/uv/month" alt="PyPI Downloads"></a>&nbsp;
  [uv](https://docs.astral.sh/uv/) - the new era one stop shop for Python packaging,
- <a style="display: inline-flex" href="https://pepy.tech/projects/polars"><img src="https://static.pepy.tech/badge/polars/month" alt="PyPI Downloads"></a>&nbsp;
  [polars](https://pola.rs/) - data manipulation via DataFrames,
- <a style="display: inline-flex" href="https://pepy.tech/projects/deltalake"><img src="https://static.pepy.tech/badge/deltalake/month" alt="PyPI Downloads"></a>&nbsp;
  [deltalake](https://github.com/delta-io/delta-rs) - native Delta Lake Python binding based on delta-rs with Pandas
  integration.

---

# How popular is Rust with Python?

<CopyrightImg img="usage">https://pypacktrends.com</CopyrightImg>

---
layout: image
---

<CopyrightImg img="junior_silky_look_beach"/>

---

<h1> Use case <span> - problem we'll use to explore the concepts</span></h1>

<div v-click>
Find the first <code>n</code> prime numbers.
</div>

<div v-click>
```python
def first_n(count: int) -> list[int]:
  ...
```
</div>
<ul v-click>
A natural (integer) number is prime if:
<li>greater than 1,</li>
<li>not a product of two smaller natural numbers.</li>
</ul>

<div v-click>
For example:

<ul>

<li>
First 5:
```python
assert first_n(5) == [2, 3, 5, 7, 11]
```
</li>

<li>
First 7:
```python
assert first_n(5) == [2, 3, 5, 7, 11, 13, 17]
```
</li>
</ul>
</div>

---

# Naive pure Python implementation

A natural (integer) number is prime if <span highlight>greater than 1</span>, and <span highlight>not a product of two
smaller natural numbers.</span>

```python {1-11|2|3,4,10|5-7|8-9|1-11|13-14|all}{lines:true,startLine:1}
def first_n(count: int) -> list[int]:
    primes: list[int] = []
    at = 2
    while len(primes) < count:
        for divisor in primes:
            if at % divisor == 0:
                break
        else:
            primes.append(at)
        at += 1
    return primes
```

---

# Rust implementation

````md magic-move
```python
def first_n(count: int) -> list[int]:
    primes: list[int] = []
    at = 2
    while len(primes) < count:
        for divisor in primes:
            if at % divisor == 0:
                break
        else:
            primes.append(at)
        at += 1
    return primes
```

```rust
pub fn first_n(count: usize) -> Vec<u32> {
    let mut result: Vec<u32> = Vec::new();
    let mut at = 2;
    while result.len() < count {
        let mut divided = false;
        for &divisor in result.iter() {
            if at % divisor == 0 {
                divided = true;
                break;
            }
        }
        if !divided {
            result.push(at);
        }
        at += 1;
    }
    result
}
```
````

---

# Rust implementation

```rust {1,18|2,17|4,16|3,15|6,7,9|5,8,12,13,14|all}{lines:true,startLine:1}
pub fn first_n(count: usize) -> Vec<u32> {
    let mut result: Vec<u32> = Vec::new();
    let mut at = 2;
    while result.len() < count {
        let mut divided = false;
        for &divisor in result.iter() {
            if at % divisor == 0 {
                divided = true;
                break;
            }
        }
        if !divided {
            result.push(at);
        }
        at += 1;
    }
    result
}
```

---
layout: image
---

<CopyrightImg img="junior_sand"/>

---

# Exposing it to Python via PyO3

We use <span highlight>procedural macros</span> (transforms AST) to annotate our methods for exposure to Python:

```rust {all|4,9,10|2,4-7|1-2,9-13|all}{lines:true,startLine:1}
use pyo3::prelude::{PyModule, PyModuleMethods};
use pyo3::{pyfunction, pymodule, wrap_pyfunction, Bound, PyResult};

#[pyfunction]
pub fn first_n(count: usize) -> Vec<u32> {
    ...
}

#[pymodule]
#[pyo3(name = "_lib")]
pub fn _lib(m: &Bound<'_, PyModule>) -> PyResult<()> {
    m.add_function(wrap_pyfunction!(first_n, m)?)?;
    Ok(())
}
```

---

# Package the rust code - Cargo.toml

```toml {all|9-20|all}{lines:true,startLine:1}
[package]
name = "primes"
version = "1.0.0"
description = "Calculate the first N print numbers"
repository = "https://github.com/gaborbernat/new-wave-of-python-packaging-binder"
license = "MIT"
edition = "2021"

[lib]
name = "_lib"
path = "rust/src/main.rs"
crate-type = ["cdylib"]

[dependencies]
pyo3 = { version = "0.24.1", features = ["abi3-py38"] } # integration with Python

[features]
extension-module = ["pyo3/extension-module"]
default = ["extension-module"]
```

---

# Package the rust code - pyproject.toml

```toml {all|1-5|7-12|all}{lines:true,startLine:1}
[build-system]
build-backend = "maturin"
requires = [
  "maturin>=1.8.3",
]

[tool.maturin]
bindings = "pyo3"
manifest-path = "Cargo.toml"
python-packages = [ "primes" ]
module-name = "primes._lib"
strip = true
```

```python {all}{lines:true,startLine:1}
from primes._lib import first_n as first_n_fast

print(first_n_fast(10))
```

---

# Final project layout

```shell {all|3,4,9-11|5-8,13-14|all}{lines:true,startLine:1}
❯ lsd --tree --icon-theme unicode
📂 .
├── 📄 Cargo.lock
├── 📄 Cargo.toml
├── 📂 primes
│   ├── 📄 __init__.py
│   └── 📄 py.typed
├── 📄 pyproject.toml
├── 📂 rust
│   └── 📂 src
│       └── 📄 main.rs
├── 📄 rust-toolchain.toml
└── 📂 tests
    └── 📄 test_prime.py
```

---

# Was it worth it?

```shell
❯ hyperfine --warmup 1 '.venv/bin/primes 5000' '.venv/bin/primes-fast 5000'
Benchmark 1: .venv/bin/primes 5000
  Time (mean ± σ):     411.3 ms ±  13.0 ms    [User: 391.5 ms, System: 5.8 ms]
  Range (min … max):   395.1 ms … 436.6 ms    10 runs

Benchmark 2: .venv/bin/primes-fast 5000
  Time (mean ± σ):      33.2 ms ±   6.2 ms    [User: 20.2 ms, System: 4.9 ms]
  Range (min … max):    27.1 ms …  61.6 ms    79 runs

Summary
  .venv/bin/primes-fast 5000 ran
   12.38 ± 2.35 times faster than .venv/bin/primes 5000
```

---
layout: image
---

<CopyrightImg img="silky_junior_look_up"/>

---
layout: section
---

# How does this work?

---

# The <a target="_blank" href="https://docs.python.org/3/reference/import.html" highlight>import system</a>

<span v-click>
<h2>How does Python know if something is import-able?</h2>

```python
>>> import functools
>>> functools
<module 'functools' from '~/.local/share/uv/python/cpython-3.13.2-linux-x86_64-gnu/lib/python3.13/functools.py'>
```

</span>

<span v-click class="text-red font-bold">It doesn't.</span>

<span v-click>
```python
>>> import functoolx
Traceback (most recent call last):
  File "<python-input-0>", line 1, in <module>
    import functoolx
ModuleNotFoundError: No module named 'functoolx'
```
</span>

<span v-click> Instead, it <span highlight>always</span> tries to import and raises if it fails. </span> <br/>
<span v-click class="text-3xl text-blue">It's easier to ask for forgiveness than permission.</span>

---

# The import system

```python {all|6}
>>> from pprint import pprint
>>> import sys
>>> pprint(sys.meta_path)
[<class '_frozen_importlib.BuiltinImporter'>,
 <class '_frozen_importlib.FrozenImporter'>,
 <class '_frozen_importlib_external.PathFinder'>]
```

---

# Path finder - [PathFinder](https://docs.python.org/3/library/importlib.html#importlib.machinery.PathFinder)

Discover modules available on the file system path.

```python {all|7-8}
>>> pprint(sys.path)
['',
 '/usr/lib64/python313.zip',
 '/usr/lib64/python3.13',
 '/usr/lib64/python3.13/lib-dynload',
 '/usr/local/lib/python3.13/site-packages',
 '/usr/lib64/python3.13/site-packages',
 '/usr/lib/python3.13/site-packages']
```

The path importer can discover `.py` files but also can load extension modules (`.so`/`.dll`) - assuming the binary is
present in the path and contains some metadata indicating this (this is what PyO3 does through maturin).

---

# How does it work?

PyO3 allows you to place procedural macro attributes on the Rust code. This macro will define Python
functions/classes/modules via the Python C API. Generate `.so` (Unix) / `.dll` (Windowes) files containing the logic.

```shell {all|3-8|9-17}
❯ lsd .venv/lib/python3.13/site-packages --tree
📂 site-packages
├── 📂 primes
│   ├── 📄 __init__.py
│   ├── 📂 __pycache__
│   │   └── 📄 __init__.cpython-313.pyc
│   ├── 🏗 _lib.abi3.so
│   └── 📄 py.typed
└── 📂 primes-1.0.0.dist-info
    ├── 📄 direct_url.json
    ├── 📄 entry_points.txt
    ├── 📄 INSTALLER
    ├── 📄 METADATA
    ├── 📄 RECORD
    ├── 📄 REQUESTED
    ├── 📄 uv_cache.json
    └── 📄 WHEEL
```

---

# What does PyO3 offer?

PyO3 will manage:

- handle Rust panic (irrecoverable error, shut-down) to BaseException,

<v-clicks>

- reference count between boundaries (so that objects are not garbage collected when used either side - hold GIL between
  boundaries and update reference counts).
- argument parsing (back and forth)
- call the user's Rust code.

</v-clicks>

---
layout: image
---

<CopyrightImg img="the_plan"/>

---

# Complications and things to consider

<v-clicks>

- Need to deal with [type conversions](https://pyo3.rs/latest/conversions/tables)
  - e.g., Python int can be any size; however, in Rust, you can have: `i8`, `u8`, `i16`, `u16`, `i32`, `u32`, `i64`,
    `u64`, `i128`, `u128`, `isize`, `usize`, `num_bigint::BigInt`.
- There is an overhead to cross between languages.
- Mostly useful for CPU-bound calculations (system calls or network I/O will not benefit).
- Rust [is not supported](https://doc.rust-lang.org/nightly/rustc/platform-support.html#platform-support) on all
  platforms (especially bleeding new or old architectures).

</v-clicks>

---

# What about [Cython](https://cython.org/)?

````md magic-move
```python
def first_n(count: int) -> list[int]:
    primes: list[int] = []
    at = 2
    while len(primes) < count:
        for divisor in primes:
            if at % divisor == 0:
                break
        else:
            primes.append(at)
        at += 1
    return primes
```

```rust
pub fn first_n(count: usize) -> Vec<u32> {
    let mut result: Vec<u32> = Vec::new();
    let mut at = 2;
    while result.len() < count {
        let mut divided = false;
        for &divisor in result.iter() {
            if at % divisor == 0 {
                divided = true;
                break;
            }
        }
        if !divided {
            result.push(at);
        }
        at += 1;
    }
    result
}
```

```python
def primes(int nb_primes):
    cdef int n, i, len_p
    cdef int[10000] p
    if nb_primes > 10000:
        raise ValueError(nb_primes)
    len_p = 0
    n = 2
    while len_p < nb_primes:
        for i in p[:len_p]:
            if n % i == 0:
                break
        else:
            p[len_p] = n
            len_p += 1
        n += 1
    result_as_list = [prime for prime in p[:len_p]]
    return result_as_list
```
````

---

# Performance

```shell
❯ hyperfine --warmup 1  'primes-fast-rust 5000' 'primes-fast-cython 5000'
Benchmark 1: primes-fast-rust 5000
  Time (mean ± σ):      37.0 ms ±  13.2 ms    [User: 20.1 ms, System: 4.5 ms]
  Range (min … max):    26.3 ms … 101.2 ms    70 runs

Benchmark 2: primes-fast-cython 5000
  Time (mean ± σ):      38.1 ms ±   8.0 ms    [User: 21.0 ms, System: 4.3 ms]
  Range (min … max):    28.3 ms …  75.7 ms    68 runs

Summary
 primes-fast-rust 5000 ran
    1.03 ± 0.43 times faster than primes-fast-cython 5000

```

---
layout: image
---

<CopyrightImg img="thanks"/>

---

# Rust limitations from a Python developer's point of view

<v-clicks>

- Need to deal with making the compiler happy ("fighting the borrow checker").
- Debugger is not as powerful as Python's (expressions in debugger don't really work) - `println`,
- compiler can be slow (especially as everything is compiled from source every time with a local cache),
- a random downstream dependency occasionally fails to build on a given platform.

</v-clicks>

---
layout: center
---

<h1>The bumpy learning curve - <span highlight>struggling is normal</span></h1>

<CopyrightImg img="learning_curve" maxHeight="541px">
<a target="_blank" href="https://sascha-kasper.com/the-bumpy-learning-curve/">Copyright 2024 Sascha Kasper All rights reserved</a>
</CopyrightImg>

---

# Reference pages

- [The Rust Programming Language](https://doc.rust-lang.org/book)
- [https://pyo3.rs/](https://pyo3.rs)
- [https://www.maturin.rs/](https://www.maturin.rs/)
- [https://docs.rs/pyo3](https://docs.rs/pyo3)
- IDE:
  - [RustRover](https://www.jetbrains.com/rust/) by JetBrains,
  - [VSCode Rust](https://code.visualstudio.com/docs/languages/rust).
- Your favorite AI helper.

---

# The end 🙏 Thanks → Questions?

We're hiring, see [TechAtBloomberg.com/python](TechAtBloomberg.com/python),
[bloomberg.com/engineering](bloomberg.com/engineering) and
[<prime-twitter/> @TechAtBloomberg](https://x.com/techatbloomberg).

<SlidevVideo autoplay autoreset loop muted width="840" style="margin: 0 auto">
  <source src="/end.mp4" type="video/mp4" />
</SlidevVideo>
