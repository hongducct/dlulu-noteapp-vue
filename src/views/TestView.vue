<template>
    <div id="app">
        <p>{{ firstName }}</p>
        <p>{{ lastName }}</p>
        <p>{{ fullName }}</p>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                firstName: 'Foo',
                lastName: 'Bar',
            }
        },
        computed: {
            fullName: {
                get() {
                    return this.firstName + ' ' + this.lastName;
                },
                set(newValue) {
                    const names = newValue.split(' ');
                    this.firstName = names[0];
                    this.lastName = names[names.length - 1];
                }
            }
        }
    }
</script>
