<script setup>
import navQuery from "@/apollo/craft/queries/singles/navigation";

const { locale, t } = useI18n();

const { data } = await useAsyncQuery({
    query: navQuery,
    variables: {
        section: 'footer',
        site: locale.value,
    },
});

</script>

<template>
    <footer class="footer">
        <div class="logoFooter">
            <h1 v-pad="{ top: 'xs' }">Massimo De Carlo</h1>
        </div>
        <div class="footerContent" v-lay="{ gap: 'l' }">
            <div v-grid="{ cols: $mq.m ? '6' : '1', gap: '0', dir: 'h', align: ['start', 'even'] }">
                <LayoutNav :data="data.entry.navigation" />
            </div>
            <div v-lay="{
  align: ['end', 'even'],
  dir: $mq.s ? 'h' : 'v',
  fluid: true
}">
                <ElementsText :data="{ text: data.entry.text, typo: 's' }" />
                <ElementsText :data="{ text: t('credits'), color: 'gray', typo: 's' }" />
            </div>
        </div>
    </footer>
</template>

<style lang="postcss">
footer {
    height: calc(var(--vh) * 100);
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    background: transparent;
    padding: var(--spacer-xs);

    .logoFooter {
        border-top: 1px solid;

        @media (--s) {
            margin-top: 50vh;
        }
        
    }

    .footerContent {
        width: calc(100% - 20px);
        position: fixed;
        left: 10px;
        bottom: 10px;

        ul li {
            padding-bottom: 0.1em;
            border-bottom: none;
            border-top: 1px solid;
            padding-bottom: 9px;

            @media (--m) {
                border-bottom: 0;
                border-top: none;
                padding-bottom: none;
            }

            &::after {
                content: '';
                background: black;
                width: 100%;
                height: 0px;
                left: 0;
                position: absolute;
                margin-top: -5px;

                @media (--m) {
                    height: 1px;
                }
            }
        }
    }

}
</style>