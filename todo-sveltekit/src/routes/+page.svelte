<script lang="ts">
import { onMount } from 'svelte';
import { getAllTasks, addTask, updateTask, deleteTask, type Task } from '$lib/todo-db';
import { Card, Button, Input, Group } from '@svelteuidev/core';

let tasks: Task[] = [];
let filteredTasks: Task[] = [];
let newTitle = '';
let newDescription = '';
let searchQuery = '';
let sortBy: 'status' | 'createdAt' | 'title' = 'status';
let sortDir: 'asc' | 'desc' = 'asc';
let editingId: number | null = null;
let editTitle = '';
let editDescription = '';

function statusOrder(status: 'active' | 'completed') {
  return status === 'active' ? 0 : 1;
}

async function loadTasks() {
  tasks = await getAllTasks();
  applyFilters();
}

function applyFilters() {
  filteredTasks = tasks
    .filter(task =>
      !searchQuery.trim() ||
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'status') {
        return sortDir === 'asc'
          ? statusOrder(a.status) - statusOrder(b.status)
          : statusOrder(b.status) - statusOrder(a.status);
      } else if (sortBy === 'createdAt') {
        return sortDir === 'asc' ? a.createdAt - b.createdAt : b.createdAt - a.createdAt;
      } else {
        return sortDir === 'asc'
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title);
      }
    });
}

async function handleAdd() {
  if (!newTitle.trim()) return;
  await addTask({ title: newTitle, description: newDescription, status: 'active' });
  newTitle = '';
  newDescription = '';
  await loadTasks();
}

function handleSearch() {
  applyFilters();
}

function handleSort(by: 'status' | 'createdAt' | 'title') {
  if (sortBy === by) {
    sortDir = sortDir === 'asc' ? 'desc' : 'asc';
  } else {
    sortBy = by;
    sortDir = 'asc';
  }
  applyFilters();
}

function startEdit(task: Task) {
  editingId = task.id;
  editTitle = task.title;
  editDescription = task.description;
}

async function saveEdit(task: Task) {
  await updateTask({ ...task, title: editTitle, description: editDescription });
  editingId = null;
  editTitle = '';
  editDescription = '';
  await loadTasks();
}

function cancelEdit() {
  editingId = null;
  editTitle = '';
  editDescription = '';
}

async function toggleStatus(task: Task) {
  await updateTask({ ...task, status: task.status === 'active' ? 'completed' : 'active' });
  await loadTasks();
}

async function handleDelete(id: number) {
  await deleteTask(id);
  await loadTasks();
}

onMount(loadTasks);
</script>

<Card style="max-width: 1200px; margin: 2em auto; box-shadow: 0 2px 16px #0001; padding: 0.5rem 2rem 2rem 2rem;">
  <Card.Section>
    <h1 style="margin-bottom: 0.5em;">Список задач</h1>
    <form on:submit|preventDefault={handleAdd} class="todo-form">
      <Input bind:value={newTitle} placeholder="Название" required class="todo-input" />
      <Input bind:value={newDescription} placeholder="Описание" class="todo-input" />
      <Button type="submit" color="teal">Добавить</Button>
      <Input bind:value={searchQuery} placeholder="Поиск..." class="todo-input search-input" />
      <Button type="button" color="gray" variant="outline" on:click={handleSearch}>Поиск</Button>
    </form>
    
    <div class="sort-controls">
      <span>Сортировка:</span>
      <Button size="xs" variant={sortBy === 'status' ? 'filled' : 'outline'} on:click={() => handleSort('status')}>
        Статус {sortBy === 'status' ? (sortDir === 'asc' ? '▲' : '▼') : ''}
      </Button>
      <Button size="xs" variant={sortBy === 'title' ? 'filled' : 'outline'} on:click={() => handleSort('title')}>
        Название {sortBy === 'title' ? (sortDir === 'asc' ? '▲' : '▼') : ''}
      </Button>
      <Button size="xs" variant={sortBy === 'createdAt' ? 'filled' : 'outline'} on:click={() => handleSort('createdAt')}>
        Дата {sortBy === 'createdAt' ? (sortDir === 'asc' ? '▲' : '▼') : ''}
      </Button>
    </div>

    <div class="tasks-grid">
      {#each filteredTasks as task (task.id)}
        <Card class="task-card" style={task.status === 'completed' ? 'opacity:0.6;' : ''}>
          <Card.Section style="padding: 0 1rem;">
            {#if editingId === task.id}
              <div class="task-edit">
                <Input bind:value={editTitle} placeholder="Название" />
                <Input bind:value={editDescription} placeholder="Описание" />
                <Group style="flex-flow: nowrap;">
                  <Button size="xs" color="teal" on:click={() => saveEdit(task)}>Сохранить</Button>
                  <Button size="xs" color="gray" variant="outline" on:click={cancelEdit}>Отмена</Button>
                </Group>
              </div>
            {:else}
              <div class="task-header">
                <h3 class="task-title">{task.title}</h3>
                <input type="checkbox" class="custom-checkbox" checked={task.status === 'completed'} on:change={() => toggleStatus(task)} />
              </div>
              {#if task.description}
                <p class="task-description">{task.description}</p>
              {/if}
              <div class="task-footer">
                <span class="task-date">{new Date(task.createdAt).toLocaleDateString()}</span>
                <Group style="flex-flow: nowrap;">
                  <Button size="xs" color="blue" variant="outline" on:click={() => startEdit(task)}>
                    Изменить
                  </Button>
                  <Button size="xs" color="red" variant="light" on:click={() => handleDelete(task.id)}>
                    Удалить
                  </Button>
                </Group>
              </div>
            {/if}
          </Card.Section>
        </Card>
      {/each}
    </div>
  </Card.Section>
</Card>

<style>
:global(body) {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-weight: 400;
  line-height: 1.6;
  color: #2c3e50;
}
.todo-form {
  margin-bottom: 1em;
  display: flex;
  gap: 0.5em;
  flex-wrap: wrap;
  align-items: center;
}
.todo-input {
  flex: 1 1 120px;
  min-width: 120px;
  max-width: 100%;
}
.search-input {
  margin-left: 1em;
}
.sort-controls {
  margin-bottom: 1.5em;
  display: flex;
  gap: 0.5em;
  align-items: center;
  flex-wrap: wrap;
}
.tasks-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
}
.task-card {
  transition: transform 0.2s, box-shadow 0.2s;
  border: 1px solid #e1e5e9;
}
.task-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}
.task-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.5em;
}
.task-title {
  margin: 0;
  font-size: 1.1em;
  font-weight: 600;
  color: #2c3e50;
  flex: 1;
  margin-right: 0.5em;
  font-family: 'Inter', sans-serif;
}
.task-description {
  margin: 0.5em 0;
  color: #666;
  font-size: 0.9em;
  line-height: 1.4;
  font-family: 'Inter', sans-serif;
}
.task-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1em;
  padding-top: 0.5em;
  border-top: 1px solid #f0f0f0;
}
.task-date {
  font-size: 0.8em;
  color: #888;
  font-family: 'Inter', sans-serif;
}
.task-edit {
  display: flex;
  flex-direction: column;
  gap: 0.5em;
}
.custom-checkbox {
  width: 1.5em;
  height: 1.5em;
  accent-color: #14b8a6;
  border-radius: 0.4em;
  border: 1.5px solid #bbb;
  cursor: pointer;
  transition: box-shadow 0.2s;
  box-shadow: 0 1px 4px #0001;
  flex-shrink: 0;
}
.custom-checkbox:focus {
  outline: 2px solid #14b8a6;
  outline-offset: 2px;
}
@media (max-width: 768px) {
  .todo-form {
    flex-direction: column;
    align-items: stretch;
    gap: 0.7em;
  }
  .search-input {
    margin-left: 0;
  }
  .sort-controls {
    align-items: stretch;
    gap: 0.3em;
  }
  .tasks-grid {
    grid-template-columns: 1fr;
    gap: 0.8rem;
  }
  .task-footer {
    flex-direction: column;
    gap: 0.5em;
    align-items: stretch;
  }
}
@media (min-width: 769px) {
  .todo-form {
    flex-direction: row;
    align-items: center;
    gap: 0.5em;
  }
}
</style>
