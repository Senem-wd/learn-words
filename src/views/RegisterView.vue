<template>
  <div class="register">
    <div class="register__container">
      <div class="register__header">
        <h1 class="register__title">{{ t('register.title') }}</h1>
        <p class="register__subtitle">{{ t('register.subtitle') }}</p>
      </div>

      <form class="register__form" @submit.prevent="handleSubmit">
        <div class="register__row">
          <AppInput
            v-model="form.firstName"
            :label="t('register.firstName')"
            :placeholder="t('register.firstName')"
            :error="errors.firstName"
          />
          <AppInput
            v-model="form.lastName"
            :label="t('register.lastName')"
            :placeholder="t('register.lastName')"
            :error="errors.lastName"
          />
        </div>

        <AppInput
          v-model="form.email"
          :label="t('register.email')"
          type="email"
          :placeholder="t('register.email')"
          :error="errors.email"
        />

        <AppInput
          v-model="form.age"
          :label="t('register.age')"
          type="number"
          :placeholder="t('register.age')"
          :error="errors.age"
        />

        <AppSelect
          v-model="form.dailyGoal"
          :label="t('register.dailyGoal')"
          :placeholder="t('register.dailyGoal')"
          :options="goalOptions"
          :error="errors.dailyGoal"
        />

        <AppButton type="submit" variant="primary" :full="true">
          {{ t('register.submit') }}
        </AppButton>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useUserStore } from '@/stores/userStore'
import AppInput from '@/components/common/AppInput.vue'
import AppSelect from '@/components/common/AppSelect.vue'
import AppButton from '@/components/common/AppButton.vue'

const { t } = useI18n()
const router = useRouter()
const userStore = useUserStore()

const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  age: '',
  dailyGoal: ''
})

const errors = reactive({
  firstName: '',
  lastName: '',
  email: '',
  age: '',
  dailyGoal: ''
})

const goalOptions = [5, 10, 20, 30, 50].map((g) => ({
  value: g,
  label: t(`goals.${g}`)
}))

function validate(): boolean {
  let valid = true
  Object.keys(errors).forEach((k) => {
    ;(errors as Record<string, string>)[k] = ''
  })

  if (!form.firstName.trim()) {
    errors.firstName = t('validation.required')
    valid = false
  }
  if (!form.lastName.trim()) {
    errors.lastName = t('validation.required')
    valid = false
  }
  if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = t('validation.emailInvalid')
    valid = false
  }
  const age = Number(form.age)
  if (!form.age || age < 5 || age > 99) {
    errors.age = t('validation.ageRange')
    valid = false
  }
  if (!form.dailyGoal) {
    errors.dailyGoal = t('validation.required')
    valid = false
  }

  return valid
}

function handleSubmit() {
  if (!validate()) return

  userStore.register({
    firstName: form.firstName,
    lastName: form.lastName,
    email: form.email,
    age: Number(form.age),
    dailyGoal: Number(form.dailyGoal),
    registeredAt: new Date().toISOString().split('T')[0]!
  })

  router.push('/home')
}
</script>

<style lang="scss" scoped>
@use '@/assets/scss/variables' as *;

.register {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: $spacing-lg;
  background: var(--color-bg);

  &__container {
    width: 100%;
    max-width: 480px;
    background: var(--color-bg-card);
    border-radius: $radius-lg;
    padding: $spacing-xl;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
  }

  &__header {
    text-align: center;
    margin-bottom: $spacing-xl;
  }

  &__title {
    font-size: 1.75rem;
    font-weight: 700;
    color: var(--color-text);
    margin-bottom: $spacing-xs;
  }

  &__subtitle {
    color: var(--color-text-muted);
    font-size: 0.95rem;
  }

  &__form {
    display: flex;
    flex-direction: column;
    gap: $spacing-md;
  }

  &__row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: $spacing-md;

    @media (max-width: #{$bp-mobile}) {
      grid-template-columns: 1fr;
    }
  }
}
</style>
