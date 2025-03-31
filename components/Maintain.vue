<script setup lang="ts">
import { ref } from "vue";

interface Project {
  name: string;
  org: string;
  repo: string;
  author?: boolean;
}
const projects = ref<Project[]>([
  { name: "platformdirs", org: "tox-dev", repo: "platformdirs", author: true },
  { name: "filelock", org: "tox-dev", repo: "filelock", author: true },
  { name: "virtualenv", org: "pypa", repo: "virtualenv", author: true },
  { name: "build", org: "pypa", repo: "build", author: true },
  { name: "tox", org: "tox-dev", repo: "tox", author: true },
  { name: "pyproject-api", org: "tox-dev", repo: "pyproject-api", author: true },
  { name: "pipdeptree", org: "tox-dev", repo: "pipdeptree" },
  { name: "pytest-env", org: "pytest-dev", repo: "pytest-env" },
  { name: "sphinx-autodoc-typehints", org: "tox-dev", repo: "sphinx-autodoc-typehints" },
  { name: "pre-commit-uv", org: "tox-dev", repo: "pre-commit-uv", author: true },
  { name: "datamodel-code-generator", org: "koxudaxi", repo: "datamodel-code-generator" },
  { name: "tox-uv", org: "tox-dev", repo: "tox-uv", author: true },
  { name: "pyproject-fmt", org: "tox-dev", repo: "pyproject-fmt", author: true },
  { name: "tox-gh", org: "tox-dev", repo: "tox-gh", author: true },
  { name: "sphinx-argparse-cli", org: "tox-dev", repo: "sphinx-argparse-cli", author: true },
  { name: "pytest-print", org: "pytest-dev", repo: "pytest-print", author: true },
  { name: "tox-ini-fmt", org: "tox-dev", repo: "tox-ini-fmt", author: true },
  { name: "tox-toml-fmt", org: "tox-dev", repo: "tox-toml-fmt", author: true },
]);
</script>

<style scoped>
.maintain tr {
  line-height: 0;
}
.maintain td {
  padding: 0;
  padding-bottom: 5px;
}
</style>

<template>
  <table class="maintain">
    <thead>
      <tr>
        <th>#</th>
        <th>Name</th>
        <th>Release</th>
        <th>Activity</th>
        <th>Popularity</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(project, index) in projects">
        <td>
          {{ index + 1 }}
        </td>
        <td>
          <a target="_blank" rel="noopener noreferrer" :href="`https://github.com/${project.org}/${project.repo}`">
            {{ project.name }} <span v-if="project.author">*</span>
          </a>
        </td>
        <td>
          <a target="_blank" rel="noopener noreferrer" :href="`https://pypi.org/project/${project.name}`">
            <img :src="`https://img.shields.io/pypi/v/${project.name}?style=flat-square`" alt="PyPI" />
          </a>
        </td>
        <td>
          <a
            target="_blank"
            rel="noopener noreferrer"
            :href="`https://github.com/${project.org}/${project.repo}/commits/main`"
          >
            <img
              :src="`https://img.shields.io/github/last-commit/${project.org}/${project.repo}?logo=python&amp;style=flat-square`"
              alt="GitHub last commit"
            />
          </a>
        </td>
        <td>
          <a
            target="_blank"
            rel="noopener noreferrer"
            :href="`https://pepy.tech/projects/${project.name}?timeRange=threeMonths&granularity=monthly&viewType=stacked&versions=*`"
          >
            <img :src="`https://static.pepy.tech/badge/${project.name}/month`" alt="PyPI - Downloads" />
          </a>
        </td>
      </tr>
    </tbody>
  </table>
</template>
