import { expect } from 'chai';
import { TestContext, TestConfiguration } from '@aurelia/testing';
import Aurelia from 'aurelia';
import { BlsApp } from '../src/bls-app';

describe('my-app', () => {
  it('should render message', async () => {
    const ctx = TestContext.createHTMLTestContext();
    const { container } = ctx;
    const node = ctx.createElement('my-app');

    const au = new Aurelia(container)
      .register(TestConfiguration)
      .app({ host: node, component: BlsApp });

    // const component = au.root.controller.bindingContext;
    await au.start().wait();

    const text = node.textContent;
    expect(text.trim()).to.equal('Hello World!');
    await au.stop().wait();
  });
});
